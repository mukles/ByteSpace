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
        {providers.map(({ name, icon }) => (
          <button
            key={name}
            type="button"
            aria-label={`Continue with ${name}`}
            className="grid size-[72px] cursor-pointer place-items-center rounded-[24px] border border-black-200 transition-colors hover:bg-shuttle-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Image src={icon} alt="" width={40} height={40} />
          </button>
        ))}
      </div>
    </div>
  );
}
