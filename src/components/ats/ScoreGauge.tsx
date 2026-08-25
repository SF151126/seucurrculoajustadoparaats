import { cn } from "@/lib/utils";

function tone(score: number) {
  if (score >= 75) return "text-success";
  if (score >= 50) return "text-warning";
  return "text-danger";
}

export function ScoreGauge({
  score,
  label = "Compatibilidade estimada",
  size = "lg",
}: {
  score: number;
  label?: string;
  size?: "lg" | "sm";
}) {
  const value = Math.max(0, Math.min(100, Math.round(score)));
  const dimension = size === "lg" ? 148 : 104;
  const stroke = size === "lg" ? 12 : 9;
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <svg width={dimension} height={dimension} className="-rotate-90">
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            strokeWidth={stroke}
            className="stroke-muted"
            fill="none"
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            strokeWidth={stroke}
            strokeLinecap="round"
            className={cn("transition-all duration-700", tone(value))}
            stroke="currentColor"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * value) / 100}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", tone(value), size === "lg" ? "text-4xl" : "text-2xl")}>
            {value}
          </span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
