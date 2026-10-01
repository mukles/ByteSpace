"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <Button
      onClick={share}
      size="md"
      className={cn(
        "backdrop-blur-[20px] focus-visible:outline-white",
        className,
      )}
    >
      <Image
        src="/images/course-details/share.svg"
        alt=""
        width={24}
        height={24}
      />
      <span aria-live="polite">{copied ? "Link copied" : label}</span>
    </Button>
  );
}
