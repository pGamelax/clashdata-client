import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.me();

  if (!user?.session) redirect("/sign-in");

  return (
    <div className="bg-backgroud h-full">
      <Header user={user.user} />
      {children}
      <Footer />
    </div>
  );
}
