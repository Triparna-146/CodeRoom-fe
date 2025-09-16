"use client";

import { Input } from "@/components/ui/input";

export default function InterviewFilter() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search candidate..." />
      <Input type="date" />
    </div>
  );
}
