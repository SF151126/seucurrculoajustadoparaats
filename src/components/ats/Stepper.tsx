import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Vaga", "Currículo", "Análise", "Otimização"];

export function Stepper({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
      {steps.map((label, index) => {
        const state = index < current ? "done" : index === current ? "active" : "todo";
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                state === "done" && "border-success bg-success text-success-foreground",
                state === "active" && "border-primary bg-primary text-primary-foreground",
                state === "todo" && "border-border bg-muted text-muted-foreground",
              )}
            >
              {state === "done" ? <Check className="h-4 w-4" /> : index + 1}
            </span>
            <span
              className={cn(
                "font-medium",
                state === "todo" ? "text-muted-foreground" : "text-foreground",
              )}
            >
              {label}
            </span>
            {index < steps.length - 1 && (
              <span className="hidden h-px w-8 bg-border sm:block" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}
