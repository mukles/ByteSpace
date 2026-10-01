import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthScreen } from "@/components/auth/auth-screen";
import { SocialSignIn } from "@/components/auth/social-sign-in";
import { login } from "@/lib/auth/actions";
import { REDIRECT_PARAM, safeRedirect } from "@/lib/auth/constants";
import { getPageMeta, readMd } from "@/lib/content";
import type { AuthPageData } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("login");
  return { title: `${title} — ByteSpace`, description };
}

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const { data } = readMd<AuthPageData>("pages/login");
  const redirectTo = safeRedirect((await searchParams)[REDIRECT_PARAM]);

  return (
    <AuthScreen intro={data.intro}>
      <AuthForm
        {...data.form}
        action={login}
        redirectTo={redirectTo}
        promptClassName="text-black-400"
      >
        {data.social && <SocialSignIn {...data.social} />}
      </AuthForm>
    </AuthScreen>
  );
}
