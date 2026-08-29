export function ShutdownPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#0c3344] px-6 text-center text-white">
      <div className="max-w-md">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-white/60">
          Service closed
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
          This website has been permanently shut down.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/75">
          All forms, logins, and stored records have been taken offline. This
          service is no longer available.
        </p>
      </div>
    </main>
  );
}
