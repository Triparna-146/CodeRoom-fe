// import Image from "next/image";
"use client";

import { PublicNavbar } from "@/components/navbar/PublicNavbar";

export default function Home() {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <PublicNavbar />
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="hero-title text-9xl font-bold flex items-center justify-center h-full">
          <span>Code</span>
          <br />
          <span>Room</span>
        </h1>
      </div>
    </div>
  );
}
