"use client";

import InterviewForm from "@/components/interviews/InterviewForm";
import { useSearchParams } from "next/navigation";


export default function EditInterviewPage() {

  //   const defaultValues = {
  //   interviewTitle: "SD Intern",
  //   interviewType: "Technical",
  //   description: "Interview for the Software Development Intern position.",
  //   date: "2025-10-11",
  //   time: "10:00",
  //   candidateName: "Aarav Mehta",
  //   candidateEmail: "aarav.mehta@example.com",
  //   // resume left blank — user can re-upload if needed
  // };

  const searchParams = useSearchParams();
  const interviewData = searchParams.get("data");

  const interview = interviewData ? JSON.parse(decodeURIComponent(interviewData)) : null;

  console.log(interview);

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-semibold mb-7">Schedule an Interview</h1> */}
      <InterviewForm mode="edit" interviewId={interview._id} defaultValues={interview} />
    </div>
  );
}
