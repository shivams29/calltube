import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { getDynamicRoute, ROUTES } from "../constants/routes";

export const createRoom = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("rooms")
    .insert({
      creator: user?.id,
    })
    .select("*");

  if (error || !data.length) {
    return { error };
  } else {
    const room = data[0];
    redirect(getDynamicRoute(ROUTES.ROOM.DETAIL, { id: room.id }));
  }
};

export const getRoomDetails = async (roomId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("rooms").select("*").eq("id", roomId);

  if (error || !data.length) {
    return { error, room: null };
  } else {
    const room = data[0];
    return { error, room };
  }
};

export const joinRoom = async (roomId: string) => {
  const { error, room } = await getRoomDetails(roomId);

  if (error || !room) {
    return { error };
  } else {
    redirect(getDynamicRoute(ROUTES.ROOM.DETAIL, { id: room.id }));
  }
};
