import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroShapeProps {
  src: string;
  size: number;
  x: number;
  y: number;
  tint: "lime" | "white";
  flip?: boolean;
}

export function HeroShape({ src, size, x, y, tint, flip }: HeroShapeProps) {
  return (
    <div
      aria-hidden="true"
      data-hero="shape"
      className={cn("pointer-events-none absolute", flip && "-scale-x-100")}
      style={{
        left: `calc(50% + ${x - size / 2}px)`,
        top: y,
        width: size,
        height: size,
      }}
    >
      <Image src={src} alt="" fill sizes={`${size}px`} />
      <div
        className={cn(
          "absolute inset-0 mix-blend-hard-light",
          tint === "lime" ? "bg-secondary" : "bg-shuttle-gray-50",
        )}
        style={{
          maskImage: `url(${src})`,
          maskSize: "100% 100%",
        }}
      />
    </div>
  );
}
