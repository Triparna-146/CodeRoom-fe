"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {useRouter} from "next/navigation";

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
    <TableRow >
      <TableCell className="font-medium">{interview.candidate}</TableCell>
      <TableCell>{interview.position}</TableCell>
      <TableCell>{new Date(interview.date).toLocaleDateString()}</TableCell>
      <TableCell>{interview.time}</TableCell>
      <TableCell>
        <Badge className={statusColor}>{interview.status}</Badge>
      </TableCell>
      <TableCell className="">
        <Button className="px-4 py-1" onClick={() => handleEdit(interview.id)}>
          {/* <MoreHorizontal className="h-4 w-4" /> */}
          edit
        </Button>
      </TableCell>
    </TableRow>
  );
}
