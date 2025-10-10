"use client";

import React, { useState } from "react";
import {
  HMSRoomProvider,
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
  useHMSNotifications,
  selectPeers,
  selectLocalPeer,
} from "@100mslive/react-sdk";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function InterviewSessionPage({ params }: { params: { id: string } }) {
  return (
    <HMSRoomProvider>
      <InterviewRoom interviewId={params.id} />
    </HMSRoomProvider>
  );
}

function InterviewRoom({ interviewId }: { interviewId: string }) {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const peers = useHMSStore(selectPeers);

  const joinRoom = async () => {
    setLoading(true);
    const tokenResponse = await axios.post("/api/100ms/token", {
      userId: name,
      role: "host", // or "guest"
      roomId: interviewId,
    });

    await hmsActions.join({
      authToken: tokenResponse.data.token,
      userName: name,
    });
    setLoading(false);
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <input
          className="border rounded p-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={joinRoom}
          className="rounded-md px-3 py-1.5 text-sm font-medium"
          disabled={!name || loading}
        >
            {loading ? "Joining..." : "Join Interview"}
        </Button>
        {/* <Button
          onClick={joinRoom}
          variant="primary"
          className="rounded-md px-3 py-1.5 text-sm font-medium"
          disabled={!name || loading}
        >
          {loading ? "Joining..." : "Join Interview"}
        </Button> */}
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        {peers.map((peer) => (
          <PeerVideo key={peer.id} peer={peer} />
        ))}
      </div>
      <div className="w-1/3 border-l flex flex-col">
        <button
          className="m-2 p-2 bg-green-600 text-white rounded"
          onClick={() => alert("Open Code Editor here")}
        >
          Open Code Editor
        </button>
      </div>
    </div>
  );
}

function PeerVideo({ peer }: any) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const hmsActions = useHMSActions();

  React.useEffect(() => {
    (async () => {
      if (peer.videoTrack) {
        const track = await hmsActions.attachVideo(peer.videoTrack, videoRef.current!);
        return () => {
          hmsActions.detachVideo(peer.videoTrack, videoRef.current!);
        };
      }
    })();
  }, [peer.videoTrack, hmsActions]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      <div className="p-2 text-center text-sm bg-gray-900 text-white">
        {peer.name}
      </div>
    </div>
  );
}
