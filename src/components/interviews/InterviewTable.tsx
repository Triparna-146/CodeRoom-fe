"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InterviewRow from "./InterviewRow";
// import { InterviewFilters } from "./InterviewFilters"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

// Dummy data
type Interview = {
  _id: string;
  candidateName: string;
  candidateEmail: string;
  title: string;
  date: string;
  time: string;
  roomId: string;
  inviteToken: string;
  status: "Scheduled" | "Pending" | "Completed";
};

export default function InterviewTable() {
  const fetchInterviews = async (): Promise<Interview[]> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/interview/all`,
      {
        withCredentials: true, // if using auth cookies
      }
    );
    console.log("API Response:", res);
    return res.data.data;
  };

  // Use React Query for fetching and caching
  const {
    data: interviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["interviews"],
    queryFn: fetchInterviews,
  });

  console.log("Fetched interviews:", interviews);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">Failed to load interviews</p>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Filters */}
      {/* <InterviewFilters /> */}

      {/* Responsive Table Wrapper */}
      <div className="rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead>Candidate</TableHead>
                <TableHead>Candidate Email</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.map((interview) => (
                <InterviewRow key={interview._id} interview={interview} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
