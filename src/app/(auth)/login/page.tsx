import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthScreen } from "@/components/auth/auth-screen";
import { SocialSignIn } from "@/components/auth/social-sign-in";
import { getPageMeta, readMd } from "@/lib/content";
import type { AuthPageData } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("login");
  return { title: `${title} — ByteSpace`, description };
}

export default function LoginPage() {
  const { data } = readMd<AuthPageData>("pages/login");

  return (
    <AuthScreen intro={data.intro}>
      <AuthForm {...data.form} promptClassName="text-black-400">
        {data.social && <SocialSignIn {...data.social} />}
      </AuthForm>
    </AuthScreen>
  );
}
