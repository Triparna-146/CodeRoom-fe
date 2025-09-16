"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface Interview {
  id: string;
  candidate: string;
  position: string;
  date: string;
  time: string;
  status: "Scheduled" | "Pending" | "Completed";
}

export default function InterviewRow({ interview }: { interview: Interview }) {
  const statusColor =
    interview.status === "Scheduled"
      ? "bg-blue-100 text-blue-800"
      : interview.status === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";

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
        <Button className="px-4 py-1">
          {/* <MoreHorizontal className="h-4 w-4" /> */}
          edit
        </Button>
      </TableCell>
    </TableRow>
  );
}
