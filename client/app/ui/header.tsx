"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { logout } from "../auth/actions";

export const Header = ({ user }: { user: User | null }) => {
  return (
    <header className="bg-slate-900">
      <div className="container">
        <div className="flex justify-between items-center py-5">
          <h5 className="text-2xl font-bold text-white font-sans">CallTube</h5>
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${user?.user_metadata.display_name
                      .split(" ")
                      .join("+")}`}
                  />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
