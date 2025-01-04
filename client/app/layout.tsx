import "@/app/ui/global.css";
import { createClient } from "./lib/supabase/server";
import { Header } from "./ui/header";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body>
        {user ? (
          <main className="bg-slate-200 h-screen">
            <Header user={user} />
            {children}
          </main>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
