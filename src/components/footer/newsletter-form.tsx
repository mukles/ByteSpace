"use client";

import { useState, type FormEvent } from "react";
import type { FooterData } from "@/types/content";

export function NewsletterForm({
  placeholder,
  button,
  success,
  disclaimer,
}: FooterData["newsletter"]) {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No newsletter backend yet — acknowledge locally
    setSubscribed(true);
    event.currentTarget.reset();
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:flex-row sm:gap-6"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          className="h-[52px] w-full rounded-full border border-shuttle-gray-200 bg-white px-6 text-base leading-[1.6] text-shuttle-gray-950 placeholder:text-shuttle-gray-950 focus:border-primary focus:outline-none sm:w-[376px]"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-[24px] bg-secondary px-6 py-3 text-lg leading-[1.2] font-medium text-secondary-foreground transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {button}
        </button>
      </form>
      <p
        role="status"
        className="max-w-[504px] text-xs leading-[1.6] text-shuttle-gray-950"
      >
        {subscribed ? success : disclaimer}
      </p>
    </div>
  );
}
