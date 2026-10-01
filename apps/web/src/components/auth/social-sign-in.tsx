import Image from "next/image";
import type { AuthPageData } from "@/types/content";

export function SocialSignIn({
  divider,
  providers,
}: NonNullable<AuthPageData["social"]>) {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex w-full items-center gap-[11px]">
        <Image
          src="/images/auth/divider-line.svg"
          alt=""
          width={200}
          height={1}
          className="h-px min-w-0 flex-1"
        />
        <span className="text-lg leading-[1.6] text-black-400">{divider}</span>
        <Image
          src="/images/auth/divider-line.svg"
          alt=""
          width={200}
          height={1}
          className="h-px min-w-0 flex-1"
        />
      </div>
      <div className="flex items-center gap-4">
        {providers.map(({ name, icon }) => {
          const tooltipId = `social-tooltip-${name.toLowerCase()}`;
          return (
            <div key={name} className="group relative">
              <button
                type="button"
                aria-label={`Continue with ${name}`}
                aria-describedby={tooltipId}
                aria-disabled="true"
                className="grid size-[72px] cursor-not-allowed place-items-center rounded-[24px] border border-black-200 transition-colors hover:bg-shuttle-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Image src={icon} alt="" width={40} height={40} />
              </button>
              <span
                id={tooltipId}
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black-950 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 group-has-focus-visible:opacity-100"
              >
                {name} sign-in coming soon
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
