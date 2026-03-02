"use client";

import { GoogleTagManager } from "@next/third-parties/google";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

export function GTM() {
  if (!gtmId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("GTM disabled: NEXT_PUBLIC_GTM_ID is not set.");
    }

    return null;
  }

  return <GoogleTagManager gtmId={gtmId} />;
}
