"use client";

import { useRouter } from "next/navigation";
import InterviewForm from "@/components/interviews/InterviewForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function EditInterviewModal({ interviewId }: { interviewId: string }) {
  const router = useRouter();

  const closeModal = () => router.back();

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Interview</DialogTitle>
        </DialogHeader>
        <InterviewForm mode="edit" interviewId={interviewId} />
      </DialogContent>
    </Dialog>
  );
}
