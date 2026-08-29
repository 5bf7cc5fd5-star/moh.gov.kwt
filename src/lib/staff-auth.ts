import { createServerFn } from "@tanstack/react-start";

export const verifyStaffLogin = createServerFn({ method: "POST" })
  .validator((raw: { email: string; password: string }) => ({
    email: String(raw.email ?? ""),
    password: String(raw.password ?? ""),
  }))
  .handler(async () => {
    return { ok: false as const };
  });
