// import Image from "next/image";

import { ThemeToggle } from "@/components/features/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="hero-title text-9xl font-bold flex items-center justify-center h-full"><span>Code</span><br /><span>Room</span></h1>
        <ThemeToggle />
        <Button className="mt-4" >
          Get Started
        </Button>
      </div>
      
    </div>
  );
}
