"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  label: string;
  title: string;
  className?: string;
}

export function ShareButton({ label, title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        "flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[24px] bg-secondary px-6 py-2 text-base leading-6 font-medium text-shuttle-gray-950 backdrop-blur-[20px] transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      <Image src="/images/course-details/share.svg" alt="" width={24} height={24} />
      <span aria-live="polite">{copied ? "Link copied" : label}</span>
    </button>
  );
}
