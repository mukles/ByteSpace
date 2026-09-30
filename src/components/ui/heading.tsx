import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes } from "react";

// Sizes follow the Figma type scale (desktop value is the last step)
const headingVariants = cva("font-heading tracking-[-0.01em]", {
  variants: {
    size: {
      "heading-l":
        "text-[36px]/[1.2] md:text-[44px]/[1.2] lg:text-[72px]/[1.2] font-semibold",
      "heading-m": "text-[32px]/[1.2] md:text-[44px]/[1.2] font-semibold",
      "heading-s": "text-[20px]/[28px] md:text-[24px]/[32px] font-semibold",
      "heading-xs": "text-[20px]/[28px] font-semibold",
      "display-s": "text-[36px]/[44px] md:text-[44px]/[52px] font-medium",
      "display-xs": "text-[28px]/[36px] md:text-[36px]/[44px] font-medium",
    },

    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },

    color: {
      dark: "text-shuttle-gray-950",
      light: "text-white",
      muted: "text-shuttle-gray-400",
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      "gradient-primary-accent":
        "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
      "gradient-accent-secondary":
        "bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent",
    },

    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },

    balance: {
      true: "text-balance",
      false: "",
    },
  },

  defaultVariants: {
    size: "heading-m",
    color: "dark",
    balance: true,
  },
});

type HeadingSize = NonNullable<VariantProps<typeof headingVariants>["size"]>;

const defaultTag: Record<HeadingSize, ElementType> = {
  "heading-l": "h1",
  "heading-m": "h2",
  "display-s": "h2",
  "display-xs": "h3",
  "heading-s": "h3",
  "heading-xs": "h4",
};

export interface HeadingProps
  extends
    Omit<HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  as?: ElementType;
}

export function Heading({
  as,
  size = "heading-m",
  weight,
  color,
  align,
  balance,
  className,
  ...props
}: HeadingProps) {
  // Explicit `as` wins; otherwise pick a sensible tag for the size
  const Tag = as ?? defaultTag[size ?? "heading-m"];

  return (
    <Tag
      className={cn(
        headingVariants({ size, weight, color, align, balance }),
        className,
      )}
      {...props}
    />
  );
}

export { headingVariants };
