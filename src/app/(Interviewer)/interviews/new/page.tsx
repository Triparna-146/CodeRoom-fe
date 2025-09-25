import InterviewForm from "@/components/interviews/InterviewForm";

export default function NewInterviewPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Schedule an Interview</h1>
      <InterviewForm mode="create" />
    </div>
  );
}
