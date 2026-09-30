import Image from "next/image";

const LOGOS = [
  { src: "/images/partners/partner-1.svg", width: 167, height: 41 },
  { src: "/images/partners/partner-2.svg", width: 168, height: 41 },
  { src: "/images/partners/partner-3.svg", width: 170, height: 41 },
  { src: "/images/partners/partner-4.svg", width: 170, height: 41 },
  { src: "/images/partners/partner-5.svg", width: 169, height: 42 },
] as const;

export function Partners() {
  return (
    <section aria-label="Our partners" className="bg-shuttle-gray-50">
      <ul className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-center gap-x-10 gap-y-8 px-4 py-12 md:gap-x-14 lg:gap-x-[72px] lg:py-20">
        {LOGOS.map((logo, i) => (
          <li key={logo.src} className="shrink-0">
            <Image
              src={logo.src}
              alt={`Partner logo ${i + 1}`}
              width={logo.width}
              height={logo.height}
              className="h-8 w-auto md:h-auto"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
