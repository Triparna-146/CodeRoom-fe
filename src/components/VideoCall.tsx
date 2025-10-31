"use client";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000"); // your NestJS backend

export default function VideoCall({ roomId }: { roomId: string }) {
    const localVideo = useRef<HTMLVideoElement>(null);
    const remoteVideo = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<RTCPeerConnection | null>(null);

    const [joined, setJoined] = useState(false);

    useEffect(() => {
        socket.emit("join-room", roomId);

        socket.on("user-joined", async (userId) => {
            console.log("User joined:", userId);
            await createOffer();
        });

        socket.on("signal", async (data) => {
            if (!peerRef.current) await createPeer();
            const { signal } = data;

            if (signal.type === "offer") {
                await peerRef.current!.setRemoteDescription(signal);
                const answer = await peerRef.current!.createAnswer();
                await peerRef.current!.setLocalDescription(answer);
                socket.emit("signal", {
                    roomId,
                    signal: answer,
                    from: socket.id,
                });
            } else if (signal.type === "answer") {
                await peerRef.current!.setRemoteDescription(signal);
            } else if (signal.candidate) {
                await peerRef.current!.addIceCandidate(signal.candidate);
            }
        });

        return () => {
            socket.off("user-joined");
            socket.off("signal");
        };
    }, []);

    async function createPeer() {
        peerRef.current = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
            ],
        });

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        if (localVideo.current) localVideo.current.srcObject = stream;

        stream.getTracks().forEach((track) => {
            peerRef.current!.addTrack(track, stream);
        });

        peerRef.current.ontrack = (event) => {
            if (remoteVideo.current) {
                remoteVideo.current.srcObject = event.streams[0];
            }
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

        socket.emit("signal", {
            roomId,
            signal: offer,
            from: socket.id,
        });
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <h1>Room: {roomId}</h1>
            <video ref={localVideo} autoPlay playsInline muted className="rounded-xl w-72 border" />
            <video ref={remoteVideo} autoPlay playsInline className="rounded-xl w-72 border" />
        </div>
    );
}
