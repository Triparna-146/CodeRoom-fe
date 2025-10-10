"use client"

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import  InterviewRow  from "./InterviewRow"
// import { InterviewFilters } from "./InterviewFilters"

// Dummy data
type Interview = {
  id: string
  candidate: string
  position: string
  date: string
  time: string
  status: "Scheduled" | "Pending" | "Completed"
}

const interviews: Interview[] = [
  {
    id: "1",
    candidate: "Aarav Mehta",
    position: "Frontend Intern",
    date: "2025-10-10",
    time: "10:00 PM",
    status: "Scheduled",
  },
  {
    id: "2",
    candidate: "Priya Sharma",
    position: "Backend Developer",
    date: "2025-08-29",
    time: "2:00 PM",
    status: "Pending",
  },
  {
    id: "3",
    candidate: "Rohan Verma",
    position: "Fullstack Engineer",
    date: "2025-09-01",
    time: "11:00 AM",
    status: "Completed",
  },
]

export default function InterviewTable() {
  return (
    <div className="w-full space-y-4">
      {/* Filters */}
      {/* <InterviewFilters /> */}

      {/* Responsive Table Wrapper */}
      <div className="rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="">
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.map((interview) => (
                <InterviewRow key={interview.id} interview={interview} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
