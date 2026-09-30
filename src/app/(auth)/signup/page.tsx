import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthScreen } from "@/components/auth/auth-screen";
import { getPageMeta, readMd } from "@/lib/content";
import type { AuthPageData } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("signup");
  return { title: `${title} — ByteSpace`, description };
}

export default function SignupPage() {
  const { data } = readMd<AuthPageData>("pages/signup");

  return (
    <AuthScreen intro={data.intro}>
      <AuthForm {...data.form} />
    </AuthScreen>
  );
}
