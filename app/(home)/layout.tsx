import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.me();


  return (
    <div className="bg-backgroud h-full">
      <Header user={user?.user} />
      {children}
      <Footer/>
    </div>
  );
}
