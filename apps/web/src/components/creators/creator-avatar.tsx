import Image from "next/image";
import { cn } from "@/lib/utils";

interface CreatorAvatarProps {
  name: string;
  src?: string;
  size: number;
  priority?: boolean;
  className?: string;
}

const TINTS = [
  "bg-secondary text-secondary-foreground",
  "bg-primary text-white",
  "bg-primary/10 text-primary",
  "bg-shuttle-gray-950 text-secondary",
];

function initials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export function CreatorAvatar({
  name,
  src,
  size,
  priority,
  className,
}: CreatorAvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={size}
        height={size}
        priority={priority}
        className={cn("shrink-0 object-cover", className)}
      />
    );
  }

  const tint =
    TINTS[[...name].reduce((sum, c) => sum + c.charCodeAt(0), 0) % TINTS.length];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center font-heading font-semibold",
        tint,
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
