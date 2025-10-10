"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface StartButtonProps {
  interviewId: string;
  date: string; // "2025-10-10"
  time: string; // "10:00 AM"
}

export function StartInterviewButton({ interviewId, date, time }: StartButtonProps) {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(true);
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const target = new Date(`${date} ${time}`).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setIsDisabled(false);
        setRemaining("");
        clearInterval(interval);
      } else {
        // optional: show countdown (e.g., "Starts in 5m 12s")
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setRemaining(`Starts in ${mins}m ${secs}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time]);

  const handleStart = () => {
    router.push(`/interviews/session/${interviewId}`);
  };

  return (
    <div className="flex flex-col items-start">
      <Button
        onClick={handleStart}
        disabled={isDisabled}
        className={isDisabled ? "opacity-60 cursor-not-allowed" : ""}
      >
        {isDisabled ? "Not Started" : "Start Interview"}
      </Button>
      {/* {remaining && <p className="text-xs text-gray-400">{remaining}</p>} */}
    </div>
  );
}
