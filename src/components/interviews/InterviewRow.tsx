"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { StartInterviewButton } from "./StartInterviewButton";

interface Interview {
  id: string;
  candidate: string;
  position: string;
  date: string;
  time: string;
  status: "Scheduled" | "Pending" | "Completed";
}

export default function InterviewRow({ interview }: { interview: Interview }) {
  const router = useRouter();

  const statusColor =
    interview.status === "Scheduled"
      ? "bg-blue-100 text-blue-800"
      : interview.status === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";

  const handleEdit = (interviewId: string) => {
    // Implement edit functionality here
    console.log(`Editing interview with ID: ${interviewId}`);
    router.push(`/interviews/${interviewId}/edit`);
  };

  return (
    <TableRow className="mx-5">
      <TableCell className="font-medium">{interview.candidate}</TableCell>
      <TableCell>{interview.position}</TableCell>
      <TableCell>{new Date(interview.date).toLocaleDateString()}</TableCell>
      <TableCell>{interview.time}</TableCell>
      <TableCell>
        <Badge className={statusColor}>{interview.status}</Badge>
      </TableCell>
      <TableCell className="">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-md px-3 py-1.5 text-sm font-medium"
            onClick={() => handleEdit(interview.id)}
          >
            Edit
          </Button>
          <StartInterviewButton
            interviewId={interview.id}
            date={interview.date}
            time={interview.time}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
