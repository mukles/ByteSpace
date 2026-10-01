import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[24px] font-medium leading-[1.2]",
  {
    variants: {
      variant: {
        secondary: "bg-secondary text-shuttle-gray-950",
        white: "bg-white text-shuttle-gray-950",
        muted: "bg-shuttle-gray-50 text-shuttle-gray-700",
        glass: "bg-[rgba(246,246,246,0.6)] text-black-700 backdrop-blur-[4px]",
      },

      size: {
        xs: "gap-1 px-3 py-1.5 text-xs",
        md: "gap-2 px-6 py-2 text-base",
        lg: "gap-2 px-6 py-3 text-lg whitespace-nowrap",
      },
    },

    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof badgeVariants> {
  as?: ElementType;
}

export function Badge({
  as: Tag = "span",
  variant,
  size,
  className,
  ...props
}: BadgeProps) {
  return (
    <Tag
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
