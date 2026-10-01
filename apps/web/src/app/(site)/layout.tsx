import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { getNavLinks } from "@/lib/content";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar links={getNavLinks()} />
      {children}
      <Footer />
    </>
  );
}
