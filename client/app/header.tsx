"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "./lib/supabase/client";

export const Header = () => {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };
  return (
    <div className="text-right">
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
