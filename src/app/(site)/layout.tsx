import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
