"use client";

import Link from "next/link";
import type { ReactNode, SubmitEvent } from "react";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import type { AuthFormData } from "@/types/content";

function preventSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();
}

interface AuthFormProps extends AuthFormData {
  children?: ReactNode;
  promptClassName?: string;
}

export function AuthForm({
  eyebrow,
  heading,
  fields,
  submit,
  prompt,
  promptLink,
  children,
  promptClassName,
}: AuthFormProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center rounded-[24px] bg-white px-6 py-10 text-shuttle-gray-950 sm:px-[63px] sm:pt-[61px]",
        children
          ? "gap-10 sm:h-[784px] sm:justify-between sm:pb-10"
          : "gap-16 sm:pb-[53px] lg:gap-[122px]",
      )}
    >
      <div className="flex w-full flex-col gap-10">
        <div>
          <p className="text-lg leading-[1.6] text-primary">{eyebrow}</p>
          <Heading
            as="h1"
            size="heading-m"
            balance={false}
            className="max-w-[453px]"
          >
            {heading}
          </Heading>
        </div>

        <form
          onSubmit={preventSubmit}
          className="flex w-full flex-col items-end gap-6"
        >
          {fields.map((field) => (
            <div key={field.name} className="flex w-full flex-col gap-2">
              <label
                htmlFor={`auth-${field.name}`}
                className="text-sm leading-[1.2] font-medium"
              >
                {field.label}
              </label>
              <input
                id={`auth-${field.name}`}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                required
                className="h-[52px] w-full rounded-xl border border-shuttle-gray-100 bg-white px-6 text-lg leading-[1.6] placeholder:text-shuttle-gray-400 focus:border-primary focus:outline-none"
              />
            </div>
          ))}
          <button
            type="submit"
            className="cursor-pointer rounded-[24px] bg-secondary px-6 py-3 text-lg leading-[1.2] font-medium text-shuttle-gray-950 transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {submit}
          </button>
        </form>
      </div>

      {children}

      <p
        className={cn(
          "flex flex-wrap justify-center gap-1 text-base leading-[1.6] text-shuttle-gray-700",
          promptClassName,
        )}
      >
        {prompt}
        <Link href={promptLink.href} className="text-primary hover:underline">
          {promptLink.label}
        </Link>
      </p>
    </div>
  );
}
