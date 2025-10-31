"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import io from "socket.io-client";
import { Button } from "../ui/button";
import { Video, VideoOff, Mic, MicOff, PhoneOff } from "lucide-react";

const socket = io(process.env.NEXT_PUBLIC_API_URL);

export default function VideoCall({ roomId }: { roomId: string }) {
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [callActive, setCallActive] = useState(true);

  const router = useRouter();
  const [showEndPopup, setShowEndPopup] = useState(false);

  // Join room & signaling
  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("user-joined", async () => {
      await createOffer();
    });

    socket.on("signal", async (data) => {
      if (!peerRef.current) await createPeer();
      const { signal } = data;

      if (signal.type === "offer") {
        await peerRef.current!.setRemoteDescription(signal);
        const answer = await peerRef.current!.createAnswer();
        await peerRef.current!.setLocalDescription(answer);
        socket.emit("signal", { roomId, signal: answer, from: socket.id });
      } else if (signal.type === "answer") {
        await peerRef.current!.setRemoteDescription(signal);
      } else if (signal.candidate) {
        await peerRef.current!.addIceCandidate(signal.candidate);
      }
    });

    socket.on("call-ended", () => {
      console.log("Remote user ended the call");
      endCall(false); // false = don’t emit again, just clean up locally
      setShowEndPopup(false);
      alert("The other user has ended the call.");
      router.push("/dashboard");
    });

    return () => {
      socket.off("user-joined");
      socket.off("signal");
      socket.off("call-ended");
    };
  }, []);

  async function createPeer() {
    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStreamRef.current = stream;

    if (localVideo.current) localVideo.current.srcObject = stream;

    stream.getTracks().forEach((track) => {
      peerRef.current!.addTrack(track, stream);
    });

    peerRef.current.ontrack = (event) => {
      if (remoteVideo.current) remoteVideo.current.srcObject = event.streams[0];
    };

    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("signal", {
          roomId,
          signal: { candidate: event.candidate },
          from: socket.id,
        });
      }
    };
  }

  async function createOffer() {
    await createPeer();
    const offer = await peerRef.current!.createOffer();
    await peerRef.current!.setLocalDescription(offer);
    socket.emit("signal", { roomId, signal: offer, from: socket.id });
  }

  // --- Control Handlers ---
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current
        .getTracks()
        .find((t) => t.kind === "video");
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current
        .getTracks()
        .find((t) => t.kind === "audio");
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(audioTrack.enabled);
      }
    }
  };

  function endCall(emitSignal: boolean = true) {
    // Stop local media tracks (mic + camera)
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Close peer connection
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    // Clear video elements
    if (localVideo.current) localVideo.current.srcObject = null;
    if (remoteVideo.current) remoteVideo.current.srcObject = null;

    // Notify peer only if this user initiated the end
    if (emitSignal) {
      socket.emit("end-call", { roomId, from: socket.id });
    }

    setCallActive(false);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      {/* Videos side by side */}
      <div className="flex justify-center items-center gap-8 mb-8">
        <video
          ref={localVideo}
          autoPlay
          playsInline
          muted
          className="w-[400px] h-[280px] rounded-xl border-2 shadow-lg object-cover bg-black"
        />
        <video
          ref={remoteVideo}
          autoPlay
          playsInline
          className="w-[400px] h-[280px] rounded-xl border-2 shadow-lg object-cover bg-black"
        />
      </div>

      {/* Control buttons */}
      {callActive && (
        <div className="flex gap-6 mt-4">
          {/* Toggle Video */}
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full transition ${
              videoEnabled
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-red-600 hover:bg-red-700"
            } text-white shadow-lg`}
          >
            {videoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
          </button>

          {/* Toggle Audio */}
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full transition ${
              audioEnabled
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-red-600 hover:bg-red-700"
            } text-white shadow-lg`}
          >
            {audioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
          </button>

          {/* End Call */}
          <button
            onClick={() => setShowEndPopup(true)}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg"
          >
            <PhoneOff size={24} />
          </button>
        </div>
      )}

      {/* End Call Confirmation Popup */}
      {showEndPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-secondary/40 rounded-xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4 text-white">End Call?</h2>
            <p className="text-gray-400 mb-6">
              Are you sure you want to end the call?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowEndPopup(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  endCall(); // This will emit "end-call" to backend
                  setShowEndPopup(false);
                  setTimeout(() => router.push("/"), 1000);
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                End Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}