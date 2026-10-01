import type { ReactNode } from "react";
import type { AuthPageData } from "@/types/content";
import { AuthShowcase } from "./auth-showcase";

interface AuthScreenProps {
  intro: AuthPageData["intro"];
  children: ReactNode;
}

export function AuthScreen({ intro, children }: AuthScreenProps) {
  return (
    <main className="mx-auto flex w-full max-w-[1232px] flex-1 flex-col gap-10 px-4 pb-16 lg:pb-[120px] xl:grid xl:grid-cols-[1fr_579px] xl:gap-0">
      <div className="relative xl:h-[784px]">
        <div className="flex max-w-[475px] flex-col gap-4 text-shuttle-gray-50">
          <p className="font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em]">
            {intro.heading}
          </p>
          <p className="text-base leading-[1.6] md:text-lg">{intro.body}</p>
        </div>
        <div className="hidden xl:block">
          <AuthShowcase />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[579px] xl:mx-0">{children}</div>
    </main>
  );
}
