import nodemailer from "nodemailer";
import {NextRequest, NextResponse} from "next/server";

type QuotePayload = {
  name?: string;
  phone?: string;
  email?: string;
  pickup?: string;
  dropoff?: string;
  date?: string;
  time?: string;
  passengers?: number | string;
  message?: string;
  company?: string;
  locale?: string;
};

const RATE_LIMIT_WINDOW_MS = 10_000;
const requestMap = new Map<string, number>();

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function manyLinks(message: string) {
  const matches = message.toLowerCase().match(/http/g);
  return (matches?.length || 0) >= 3;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanupRateMap(now: number) {
  if (requestMap.size < 200) {
    return;
  }

  for (const [ip, timestamp] of requestMap) {
    if (now - timestamp > RATE_LIMIT_WINDOW_MS * 2) {
      requestMap.delete(ip);
    }
  }
}

function normalizeValue(value: QuotePayload[keyof QuotePayload]) {
  if (value === undefined || value === null || value === "") {
    return "-";
  }

  return String(value);
}

export async function POST(request: NextRequest) {
  let payload: QuotePayload;

  try {
    payload = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ok: false, error: "invalid_json"}, {status: 400});
  }

  const ip = getClientIp(request);
  const now = Date.now();
  cleanupRateMap(now);
  const lastRequest = requestMap.get(ip);

  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json({ok: false, error: "rate_limited"}, {status: 429});
  }

  requestMap.set(ip, now);

  if (payload.company && payload.company.trim().length > 0) {
    return NextResponse.json({ok: true}, {status: 200});
  }

  const required = {
    name: payload.name?.trim() || "",
    phone: payload.phone?.trim() || "",
    email: payload.email?.trim() || "",
    pickup: payload.pickup?.trim() || "",
    dropoff: payload.dropoff?.trim() || "",
  };

  if (!required.name || !required.phone || !required.email || !required.pickup || !required.dropoff) {
    return NextResponse.json({ok: false, error: "validation_error"}, {status: 400});
  }

  if (!isValidEmail(required.email)) {
    return NextResponse.json({ok: false, error: "invalid_email"}, {status: 400});
  }

  if (manyLinks(payload.message || "")) {
    return NextResponse.json({ok: false, error: "spam_detected"}, {status: 400});
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const quoteTo = process.env.QUOTE_TO;
  const quoteFrom = process.env.QUOTE_FROM;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !quoteTo || !quoteFrom) {
    return NextResponse.json({ok: false, error: "smtp_not_configured"}, {status: 500});
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    requireTLS: smtpPort === 587,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const fields = {
    Locale: normalizeValue(payload.locale),
    Name: required.name,
    Phone: required.phone,
    Email: required.email,
    Pickup: required.pickup,
    Dropoff: required.dropoff,
    Date: normalizeValue(payload.date),
    Time: normalizeValue(payload.time),
    Passengers: normalizeValue(payload.passengers),
    Message: normalizeValue(payload.message),
    IP: ip,
  };

  const htmlRows = Object.entries(fields)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #E7E5E4;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #E7E5E4;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const textBody = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  try {
    await transporter.sendMail({
      from: `Royal Taxi BCN <${quoteFrom}>`,
      to: quoteTo,
      replyTo: required.email,
      subject: "New Quote Request — RoyalTaxiBCN",
      text: textBody,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#0D0D0D;">
          <h2 style="margin:0 0 16px 0;">New Quote Request</h2>
          <table style="border-collapse:collapse;width:100%;max-width:720px;">${htmlRows}</table>
        </div>
      `,
    });

    return NextResponse.json({ok: true}, {status: 200});
  } catch {
    return NextResponse.json({ok: false, error: "smtp_error"}, {status: 500});
  }
}
