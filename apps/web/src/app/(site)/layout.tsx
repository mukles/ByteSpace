import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { getNavLinks } from "@/lib/content";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar links={getNavLinks()} />
      {children}
      <Footer />
      <SmoothScroll />
      <ScrollReveal />
    </>
  );
}
