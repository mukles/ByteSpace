import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthScreen } from "@/components/auth/auth-screen";
import { register } from "@/lib/auth/actions";
import { REDIRECT_PARAM, safeRedirect } from "@/lib/auth/constants";
import { getPageMeta, readMd } from "@/lib/content";
import type { AuthPageData } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("signup");
  return { title: `${title} — ByteSpace`, description };
}

export default async function SignupPage({
  searchParams,
}: PageProps<"/signup">) {
  const { data } = readMd<AuthPageData>("pages/signup");
  const redirectTo = safeRedirect((await searchParams)[REDIRECT_PARAM]);

  return (
    <AuthScreen intro={data.intro}>
      <AuthForm {...data.form} action={register} redirectTo={redirectTo} />
    </AuthScreen>
  );
}
