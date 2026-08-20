import { createServerFn } from "@tanstack/react-start";

export const verifyStaffLogin = createServerFn({ method: "POST" })
  .validator((raw: { email: string; password: string }) => ({
    email: String(raw.email ?? "").trim().toLowerCase(),
    password: String(raw.password ?? ""),
  }))
  .handler(async ({ data }) => {
    const email = "mugagamuto04@gmail.com";
    const password = "Madahketa@17";
    return { ok: data.email === email && data.password === password };
  });
