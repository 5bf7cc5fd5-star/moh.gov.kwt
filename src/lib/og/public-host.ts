/** Hostname suitable for absolute og:image / x:game:image URLs. */
export function publicShareHost(raw?: string): string {
  const candidates = [
    raw,
    typeof process !== "undefined" ? process.env?.VITE_PUBLIC_HOSTNAME : "",
    typeof import.meta !== "undefined"
      ? (import.meta.env?.VITE_PUBLIC_HOSTNAME as string | undefined)
      : "",
    typeof window !== "undefined" ? window.location.hostname : "",
  ];
  for (const value of candidates) {
    const host = String(value ?? "")
      .split(",")[0]
      .trim()
      .split(":")[0]
      .toLowerCase();
    if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) continue;
    if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) continue;
    return host;
  }
  return "";
}
