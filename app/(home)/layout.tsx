import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { api } from "@/lib/api";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.me();

  const userClans = await api.clans.listMyClans();
  return (
    <div className="bg-backgroud h-full">
      <Header user={user?.user} userClans={userClans} />
      {children}
      <Footer />
    </div>
  );
}
