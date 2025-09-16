import InterviewRow from "./InterviewRow";
import InterviewFilter from "./InterviewFilter";

export default function InterviewTable() {
  const dummyInterviews = [
    { id: "1", candidate: "Alice", date: "2025-09-01", time: "10:00 AM" },
    { id: "2", candidate: "Bob", date: "2025-09-02", time: "02:00 PM" },
  ];

  return (
    <div className="space-y-4">
      <InterviewFilter />

      <table className="w-full border rounded-md">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Candidate</th>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Time</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyInterviews.map((interview) => (
            <InterviewRow key={interview.id} interview={interview} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
