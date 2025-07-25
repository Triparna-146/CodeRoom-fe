// import Image from "next/image";
"use client";

import { ThemeToggle } from "@/components/features/theme-toggle";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="hero-title text-9xl font-bold flex items-center justify-center h-full">
          <span>Code</span>
          <br />
          <span>Room</span>
        </h1>
        {/* <ThemeToggle />
        <Button onClick={() => toast.success("Welcome to CodeRoom!")}>
          Get Started
        </Button> */}
      </div>
    </div>
  );
}
