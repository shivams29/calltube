import { createClient } from "./lib/supabase/server";
import { Header } from "./ui/header";
import { Home } from "./ui/home";

export default async function Page() {
  const supabase = await createClient();
  const { data: currentUser } = await supabase.auth.getUser();
  return (
    <main className="bg-slate-200 h-screen">
      <Header user={currentUser.user} />
      <Home />
    </main>
  );
}
