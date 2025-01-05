"use client";

import { useParams } from "next/navigation";
import { getRoomDetails } from "../actions";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

export default function Page() {
  const { id: roomId } = useParams() as { id: string };
  const [room, setRoomData] = useState(null);
  const [micEnabled, setMicEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [localStream, setLocalStream] = useState<null | MediaStream>(null);
  const [remoteStream, setRemoteStream] = useState<null | MediaStream>(null);
  const [localStreamError, setLocalStreamError] = useState("");
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  useEffect(() => {
    if (room) {
      initLocalMediaDevices();
    } else {
      getRoom();
    }
  }, [room]);

  const initLocalMediaDevices = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
    } catch (error: any) {
      if (error.name === "NotFoundError") {
        setLocalStreamError("No camera found");
      }
    }
  };

  const getRoom = async () => {
    const { room, error } = await getRoomDetails(roomId);
    if (room && !error) setRoomData(room);
  };

  const handleVideoClick = useCallback(async () => {
    if (!videoEnabled) {
      initLocalMediaDevices();
    } else {
      setLocalStream(null);
    }
    setVideoEnabled(!videoEnabled);
  }, [videoEnabled]);

  const handleMicClick = useCallback(() => {
    setMicEnabled(!micEnabled);
  }, [micEnabled]);

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-sans font-bold">Welcome to the room!</h1>
      <div>
        <div>
          <span id="currentRoom"></span>
        </div>
        <div className="flex justify-center items-center gap-10 mt-20">
          <div className="rounded-xl overflow-hidden relative h-96 w-1/2">
            {!localStream || localStreamError ? (
              <div className="flex items-center justify-center bg-slate-950 w-full h-full">
                <p className="text-white">{localStreamError || "Camera turned off."}</p>
              </div>
            ) : (
              <video ref={localVideo} id="localVideo" muted autoPlay playsInline></video>
            )}
            <div className="absolute flex justify-center items-center w-full bottom-4 gap-3">
              <Button
                variant={videoEnabled ? "outline" : "destructive"}
                size="icon"
                onClick={handleVideoClick}
                disabled={!!localStreamError}
              >
                {videoEnabled ? <Video /> : <VideoOff />}
              </Button>
              <Button
                variant={micEnabled ? "outline" : "destructive"}
                size="icon"
                onClick={handleMicClick}
                disabled={!!localStreamError}
              >
                {micEnabled ? <Mic /> : <MicOff />}
              </Button>
            </div>
          </div>
          {remoteStream && (
            <div className="rounded-xl overflow-hidden h-96 w-1/2">
              <video ref={remoteVideo} autoPlay playsInline></video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
