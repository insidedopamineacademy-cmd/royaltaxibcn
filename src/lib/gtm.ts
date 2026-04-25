"use client";

type GTMEvent = {
  event: string;
  [key: string]: string | number | boolean | null | undefined;
};

export function trackGTMEvent(event: GTMEvent) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}
