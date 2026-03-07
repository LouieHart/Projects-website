"use client";

interface Props {
  formula: string;
  position?: "left" | "right" | "center";
  size?: string;
  className?: string;
}

export default function MathWatermark({
  formula,
  position = "right",
  size = "text-[180px] md:text-[260px]",
  className = "",
}: Props) {
  const posClass =
    position === "left"
      ? "left-[-60px] top-[10%]"
      : position === "center"
        ? "left-1/2 -translate-x-1/2 top-[20%]"
        : "right-[-40px] top-[15%]";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden"
    >
      <span
        className={`absolute font-display ${size} text-cream-border opacity-[0.06] whitespace-nowrap leading-none float-slower ${posClass} ${className}`}
      >
        {formula}
      </span>
    </div>
  );
}
