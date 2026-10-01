import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[24px] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70",
  {
    variants: {
      variant: {
        primary: "bg-secondary text-shuttle-gray-950 hover:bg-secondary-hover",
        muted:
          "bg-shuttle-gray-50 text-shuttle-gray-700 hover:bg-shuttle-gray-100",
        outline:
          "border border-shuttle-gray-200 bg-white text-shuttle-gray-950 hover:bg-shuttle-gray-50",
        link: "rounded-none text-primary hover:underline disabled:cursor-default disabled:text-shuttle-gray-300 disabled:no-underline disabled:opacity-100",
      },

      size: {
        sm: "px-4 py-2 text-base leading-[1.2]",
        md: "px-6 py-2 text-base leading-6",
        lg: "px-6 py-3 text-lg leading-[1.2]",
        tab: "px-4 py-3 text-base leading-[1.2]",
        inline: "text-base leading-[1.2]",
      },

      fullWidth: {
        true: "w-full",
        false: "",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonAsButton = ComponentProps<"button"> & { href?: never };
type ButtonAsLink = ComponentProps<typeof Link>;

export type ButtonProps = ButtonVariantProps & (ButtonAsButton | ButtonAsLink);

export function Button({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

  if (props.href !== undefined) {
    return <Link {...(props as ButtonAsLink)} className={classes} />;
  }

  return (
    <button type="button" {...(props as ButtonAsButton)} className={classes} />
  );
}

export { buttonVariants };
