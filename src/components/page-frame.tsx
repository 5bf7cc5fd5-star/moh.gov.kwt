import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageFrame({
  children,
  narrow = true,
}: {
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full flex-1 px-4 py-6",
        narrow ? "max-w-xl" : "max-w-5xl",
      )}
    >
      {children}
    </div>
  );
}
