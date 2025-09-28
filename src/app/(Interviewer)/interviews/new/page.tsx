import InterviewForm from "@/components/interviews/InterviewForm";

export default function NewInterviewPage() {
  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-semibold mb-7">Schedule an Interview</h1> */}
      <InterviewForm mode="create" />
    </div>
  );
}
