"use client";

import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export function FieldLabel({
  children,
  required,
  htmlFor,
}: {
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[0.95rem] font-medium leading-snug text-ink"
    >
      {children}
      {required ? (
        <span className="text-star" aria-hidden="true">
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm text-star" role="alert">
      {message}
    </p>
  );
}

const controlClass =
  "w-full rounded-[var(--radius-ctl)] border border-line bg-card px-3.5 py-3.5 text-[1.05rem] text-ink outline-none transition-[border,box-shadow] placeholder:text-muted/80 focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:opacity-60";

export function TextInput({
  label,
  required,
  error,
  hint,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      {hint ? <p className="mb-1.5 text-sm text-muted">{hint}</p> : null}
      <input
        id={id}
        {...props}
        className={cn(controlClass, error && "border-star", className)}
      />
      <FieldError message={error} />
    </div>
  );
}

export function SelectInput({
  label,
  required,
  error,
  hint,
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      {hint ? <p className="mb-1.5 text-sm text-muted">{hint}</p> : null}
      <div className="relative">
        <select
          id={id}
          {...props}
          className={cn(
            controlClass,
            "appearance-none bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10",
            !props.value && "text-muted",
            error && "border-star",
            className,
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235b6b73' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")`,
          }}
        >
          {children}
        </select>
      </div>
      <FieldError message={error} />
    </div>
  );
}

export function DateInput({
  label,
  required,
  error,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  const pretty = formatDisplayDate(value);
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center text-[1.05rem] font-medium text-ink">
          {pretty}
        </div>
        <input
          id={id}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            controlClass,
            "relative z-0 text-center text-transparent caret-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
            error && "border-star",
          )}
        />
      </div>
      <FieldError message={error} />
    </div>
  );
}

function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function YesNo({
  label,
  required,
  value,
  onChange,
  yesLabel,
  noLabel,
  error,
}: {
  label: ReactNode;
  required?: boolean;
  value: boolean | null;
  onChange: (v: boolean) => void;
  yesLabel: string;
  noLabel: string;
  error?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-[0.98rem] font-medium leading-snug text-ink">
        {label}
        {required ? (
          <span className="text-star" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </p>
      <div
        className={cn(
          "grid grid-cols-2 overflow-hidden rounded-[var(--radius-ctl)] bg-yesno p-1",
          error && "ring-1 ring-star",
        )}
        role="radiogroup"
      >
        {[
          { v: true, label: yesLabel },
          { v: false, label: noLabel },
        ].map((opt) => {
          const selected = value === opt.v;
          return (
            <button
              key={String(opt.v)}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.v)}
              className={cn(
                "min-h-11 rounded-[calc(var(--radius-ctl)-4px)] py-3 text-[1.02rem] transition-colors",
                selected
                  ? "bg-card font-semibold text-ink shadow-sm"
                  : "font-medium text-muted",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}

export function ChoicePills({
  label,
  required,
  value,
  onChange,
  options,
  error,
}: {
  label: ReactNode;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
  error?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-[0.98rem] font-medium leading-snug text-ink">
        {label}
        {required ? (
          <span className="text-star" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </p>
      <div className="flex flex-wrap gap-2" role="radiogroup">
        {options.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.id)}
              className={cn(
                "min-h-11 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-green bg-green text-white"
                  : "border-line bg-card text-ink hover:border-teal",
                error && !selected && "border-star/40",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}

export function FormNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-[var(--radius-ctl)] bg-warn-bg px-3 py-2.5 text-sm leading-relaxed text-warn">
      {children}
    </p>
  );
}

export function SectionCard({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)] sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-green-soft text-sm font-semibold text-green">
          {n}
        </span>
        <h2 className="text-xl font-bold tracking-tight text-ink">{title}</h2>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
