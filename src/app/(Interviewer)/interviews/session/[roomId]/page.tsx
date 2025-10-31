"use client";

import { useParams } from "next/navigation";
import VideoCall from "@/components/session/VideoCall";

export default function InterviewRoom() {
    const { roomId } = useParams();

    if (!roomId) return <div>Loading...</div>;

    return <VideoCall roomId={"TestRoom"} />;
}