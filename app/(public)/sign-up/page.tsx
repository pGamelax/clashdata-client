import { SignUp } from "@/components/sign-up";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await api.me();

  if (user?.session) {
    redirect("/dashboard/clans");
  }

  return (
    <div>
      <SignUp />
    </div>
  );
}
