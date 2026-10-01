import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative isolate flex flex-1 flex-col overflow-hidden bg-primary text-shuttle-gray-50">
      <Image
        src="/images/auth/grid.svg"
        alt=""
        width={1442}
        height={1026}
        aria-hidden="true"
        className="pointer-events-none absolute -top-0.5 left-1/2 -z-10 max-w-none -translate-x-1/2"
      />
      <header className="mx-auto flex h-20 w-full max-w-[1232px] items-center px-4 lg:h-[120px] lg:items-start lg:pt-[35px]">
        <Link href="/" aria-label="ByteSpace home">
          <Image
            src="/images/hero/logo.svg"
            alt=""
            width={28.875}
            height={31.5}
          />
        </Link>
      </header>
      {children}
    </div>
  );
}
