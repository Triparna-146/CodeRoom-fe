"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InterviewFormProps {
  mode: "create" | "edit";
  interviewId?: string;
  defaultValues?: any;
}

export default function InterviewForm({ mode, interviewId, defaultValues }: InterviewFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues || { candidateName: "", date: "", time: "" },
  });

  const onSubmit = (data: any) => {
    if (mode === "create") {
      console.log("Creating interview:", data);
      // call POST API here
    } else {
      console.log("Updating interview:", interviewId, data);
      // call PUT/PATCH API here
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("candidateName")} placeholder="Candidate Name" />
      <Input {...register("date")} type="date" />
      <Input {...register("time")} type="time" />

      <Button type="submit">
        {mode === "create" ? "Schedule Interview" : "Update Interview"}
      </Button>
    </form>
  );
}
