"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {useRouter} from "next/navigation";
import { start } from "repl";

interface Interview {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  title: string;
  date: string;
  time: string;
  roomId: string;
  inviteToken: string;
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

  const handleEdit = (interview: Interview) => {
  const encodedInterview = encodeURIComponent(JSON.stringify(interview));
  router.push(`/interviews/${interview._id}/edit?data=${encodedInterview}`);
};

  const startInterview = (interviewId: string) => {
    // Implement start interview functionality here
    console.log(`Starting interview with ID: ${interviewId}`);
    router.push(`/interview/join?roomId=${interview.roomId}&token=${interview.inviteToken}`);
  }

  return (
    <TableRow >
      <TableCell className="font-medium">{interview.candidateName}</TableCell>
      <TableCell>{interview.candidateEmail}</TableCell>
      <TableCell>{interview.title}</TableCell>
      <TableCell>{new Date(interview.date).toLocaleDateString()}</TableCell>
      <TableCell>{interview.time}</TableCell>
      <TableCell>
        <Badge className={statusColor}>{interview.status}</Badge>
      </TableCell>
      <TableCell className="flex space-x-2">
        <Button variant="secondary" className="px-4 py-1 cursor-pointer" onClick={() => handleEdit(interview)}>
          {/* <MoreHorizontal className="h-4 w-4" /> */}
          edit
        </Button>
        <Button className="px-4 py-1 cursor-pointer" onClick={() => startInterview(interview._id)}>
          {/* <MoreHorizontal className="h-4 w-4" /> */}
          start
        </Button>
      </TableCell>
    </TableRow>
  );
}
