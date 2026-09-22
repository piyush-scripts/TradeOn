"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Progress({ className, value = 0, ...props }: React.ComponentProps<"div"> & { value?: number }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <div
        className="h-full bg-foreground transition-all"
        style={{ width: `${clamped}%` }}
      />
      <div
        className="absolute left-[calc(var(--progress-value,0%)-0.375rem)] top-1/2 size-3 -translate-y-1/2 rounded-full border bg-background shadow-sm transition-all"
        style={{ ["--progress-value" as never]: `${clamped}%` } as React.CSSProperties}
      />
    </div>
  );
}

export { Progress };
