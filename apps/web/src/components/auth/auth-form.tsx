"use client";

import Link from "next/link";
import { useActionState, type ReactNode } from "react";
import { Heading } from "@/components/ui/heading";
import type { AuthFormState } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import type { AuthFormData } from "@/types/content";

interface AuthFormProps extends AuthFormData {
  action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  redirectTo?: string;
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
  action,
  redirectTo,
  children,
  promptClassName,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

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
          action={formAction}
          aria-describedby={state.error ? "auth-error" : undefined}
          className="flex w-full flex-col items-end gap-6"
        >
          {redirectTo && (
            <input type="hidden" name="redirectTo" value={redirectTo} />
          )}
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
                defaultValue={state.values?.[field.name]}
                required
                className="h-[52px] w-full rounded-xl border border-shuttle-gray-100 bg-white px-6 text-lg leading-[1.6] placeholder:text-shuttle-gray-400 focus:border-primary focus:outline-none"
              />
            </div>
          ))}
          {state.error && (
            <p
              id="auth-error"
              role="alert"
              className="w-full text-base leading-[1.6] text-danger"
            >
              {state.error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded-[24px] bg-secondary px-6 py-3 text-lg leading-[1.2] font-medium text-shuttle-gray-950 transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70"
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
