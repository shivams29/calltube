"use client";
import { useParams } from "next/navigation";
import { getRoomDetails } from "../actions";
import { useEffect, useState } from "react";

export default function Page() {
  const { id: roomId } = useParams() as { id: string };
  const [room, setRoomData] = useState(null);

  useEffect(() => {
    const getRoom = async () => {
      const { room, error } = await getRoomDetails(roomId);
      if (room && !error) setRoomData(room);
    };
    getRoom();
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-sans font-bold">
        Welcome to the room!
        {JSON.stringify(room)}
      </h1>
    </div>
  );
}
