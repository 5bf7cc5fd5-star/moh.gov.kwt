"use client";

import { useEffect, useState } from "react";

export function QrCode({ value, label }: { value: string; label: string }) {
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    void import("qrcode").then(async (QRCode) => {
      const markup = await QRCode.toString(value, {
        type: "svg",
        margin: 1,
        width: 220,
        color: { dark: "#0c3344", light: "#ffffff" },
        errorCorrectionLevel: "M",
      });
      if (!cancelled) setSvg(markup);
    });
    return () => {
      cancelled = true;
    };
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="size-[220px] rounded-xl bg-card p-2"
        aria-label={label}
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
    </div>
  );
}
