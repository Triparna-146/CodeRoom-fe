import InterviewTable from "@/components/interviews/InterviewTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InterviewsPage() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Interviews</h1>
        <Link href="/interviews/new">
          <Button>+ Add Interview</Button>
        </Link>
      </div>

      {/* Filters */}
      <InterviewTable />
    </div>
  );
}
