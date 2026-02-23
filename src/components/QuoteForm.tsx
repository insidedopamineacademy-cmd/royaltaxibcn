"use client";

import {FormEvent, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {Button} from "@/components/Button";

type QuoteFormProps = {
  locale: string;
};

type QuoteState = {
  name: string;
  phone: string;
  email: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: string;
  message: string;
  company: string;
};

const initialState: QuoteState = {
  name: "",
  phone: "",
  email: "",
  pickup: "",
  dropoff: "",
  date: "",
  time: "",
  passengers: "",
  message: "",
  company: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteForm({locale}: QuoteFormProps) {
  const t = useTranslations("quotePage");
  const formT = useTranslations("quotePage.form");
  const [form, setForm] = useState<QuoteState>(initialState);
  const [errors, setErrors] = useState<string[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const whatsappHref = useMemo(
    () =>
      locale === "es"
        ? "https://wa.me/34617629115?text=Hola%20me%20gustar%C3%ADa%20pedir%20un%20presupuesto%20para%20un%20taxi%20en%20Barcelona."
        : "https://wa.me/34617629115?text=Hello%20I%20would%20like%20a%20quote%20for%20a%20taxi%20in%20Barcelona.",
    [locale],
  );

  function validateClient(state: QuoteState) {
    const nextErrors: string[] = [];

    if (!state.name.trim()) {
      nextErrors.push(formT("requiredName"));
    }

    if (!state.phone.trim()) {
      nextErrors.push(formT("requiredPhone"));
    }

    if (!state.email.trim()) {
      nextErrors.push(formT("requiredEmail"));
    } else if (!emailPattern.test(state.email.trim())) {
      nextErrors.push(formT("invalidEmail"));
    }

    if (!state.pickup.trim()) {
      nextErrors.push(formT("requiredPickup"));
    }

    if (!state.dropoff.trim()) {
      nextErrors.push(formT("requiredDropoff"));
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApiError(null);

    const nextErrors = validateClient(form);
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors([]);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          locale,
          passengers: form.passengers ? Number(form.passengers) : undefined,
        }),
      });

      const data = (await response.json()) as {ok: boolean; error?: string};

      if (!response.ok || !data.ok) {
        setApiError(formT("errorGeneric"));
        return;
      }

      setIsSuccess(true);
    } catch {
      setApiError(formT("errorGeneric"));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-10">
        <div aria-live="polite" className="text-center">
          <p className="mb-3 text-2xl" aria-hidden="true">✓</p>
          <h2 className="text-2xl">{t("successTitle")}</h2>
          <p className="mx-auto mt-3 max-w-prose leading-7 text-[var(--color-muted)]">{t("successNote")}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="whatsapp">
            {t("whatsapp")}
          </Button>
          <Button href="tel:+34617629115" variant="secondary">
            {t("callNow")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-soft sm:p-10 overflow-hidden"
    >
      <div className="grid gap-5 sm:grid-cols-2 min-w-0">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">
            {formT("name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({...prev, name: event.target.value}))}
            placeholder={formT("namePlaceholder")}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">
            {formT("phone")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(event) => setForm((prev) => ({...prev, phone: event.target.value}))}
            placeholder={formT("phonePlaceholder")}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">
            {formT("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm((prev) => ({...prev, email: event.target.value}))}
            placeholder={formT("emailPlaceholder")}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30"
          />
        </div>

        <div>
          <label htmlFor="passengers" className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">
            {formT("passengers")}
          </label>
          <input
            id="passengers"
            name="passengers"
            type="number"
            min={1}
            value={form.passengers}
            onChange={(event) => setForm((prev) => ({...prev, passengers: event.target.value}))}
            placeholder={formT("passengersPlaceholder")}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="pickup" className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">
            {formT("pickup")}
          </label>
          <input
            id="pickup"
            name="pickup"
            type="text"
            required
            value={form.pickup}
            onChange={(event) => setForm((prev) => ({...prev, pickup: event.target.value}))}
            placeholder={formT("pickupPlaceholder")}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="dropoff" className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">
            {formT("dropoff")}
          </label>
          <input
            id="dropoff"
            name="dropoff"
            type="text"
            required
            value={form.dropoff}
            onChange={(event) => setForm((prev) => ({...prev, dropoff: event.target.value}))}
            placeholder={formT("dropoffPlaceholder")}
            className="h-11 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30"
          />
        </div>

        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">
            {formT("date")}
          </label>
          <input
            key={`date-${form.date || "empty"}`}
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={(event) => setForm((prev) => ({...prev, date: event.target.value}))}
            placeholder="YYYY-MM-DD"
            className={
              "h-11 w-full min-w-0 appearance-none rounded-xl border border-[var(--color-border)] bg-white px-3 " +
              "text-[16px] leading-[1.25] outline-none transition " +
              "focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30 " +
              "[color-scheme:light] " +
              (form.date ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]")
            }
            aria-label={formT("date")}
          />
        </div>

        <div>
          <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">
            {formT("time")}
          </label>
          <input
            key={`time-${form.time || "empty"}`}
            id="time"
            name="time"
            type="time"
            value={form.time}
            onChange={(event) => setForm((prev) => ({...prev, time: event.target.value}))}
            placeholder="HH:MM"
            className={
              "h-11 w-full min-w-0 appearance-none rounded-xl border border-[var(--color-border)] bg-white px-3 " +
              "text-[16px] leading-[1.25] outline-none transition " +
              "focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30 " +
              "[color-scheme:light] " +
              (form.time ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]")
            }
            aria-label={formT("time")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--color-navy)]">
            {formT("message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(event) => setForm((prev) => ({...prev, message: event.target.value}))}
            placeholder={formT("messagePlaceholder")}
            className="w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30"
          />
        </div>
      </div>

      <input
        type="text"
        name="company"
        value={form.company}
        onChange={(event) => setForm((prev) => ({...prev, company: event.target.value}))}
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />

      <p className="mt-5 text-sm text-[var(--color-muted)]">{formT("recommended")}</p>

      {errors.length > 0 && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4" role="alert" aria-live="polite">
          <p className="text-sm font-semibold text-red-700">{formT("errorSummaryTitle")}</p>
          <ul className="mt-2 list-disc pl-5 text-sm text-red-700">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {apiError && (
        <p aria-live="polite" className="mt-4 text-sm text-red-700">
          {apiError}
        </p>
      )}

      <div className="mt-7">
        <Button type="submit" variant="primary" disabled={isSubmitting} className="h-12 px-8 text-base">
          {isSubmitting ? formT("submitting") : formT("submit")}
        </Button>
      </div>
    </form>
  );
}
