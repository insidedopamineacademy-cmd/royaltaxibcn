"use client";

import { sendGTMEvent } from "@next/third-parties/google";

type GTMEvent = {
  event: string;
  [key: string]: string | number | boolean | null | undefined;
};

export function trackGTMEvent(event: GTMEvent) {
  sendGTMEvent(event);
}
