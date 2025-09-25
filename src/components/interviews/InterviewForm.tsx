"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as yup from "yup";

// ✅ Form field types
type InterviewFormInputs = {
  interviewTitle: string;
  interviewType: string;
  description?: string;
  date: string;
  time: string;
  candidateName: string;
  candidateEmail: string;
  resume: FileList;
};

// ✅ Validation schema (Yup v1 style)
const interviewFormSchema: yup.ObjectSchema<InterviewFormInputs> = yup
  .object({
    interviewTitle: yup.string().required("Interview title is required"),
    interviewType: yup.string().required("Interview type is required"),
    description: yup.string().required("Description is required"),
    date: yup.string().required("Date is required"),
    time: yup.string().required("Time is required"),
    candidateName: yup.string().required("Candidate name is required"),
    candidateEmail: yup
      .string()
      .email("Invalid email")
      .required("Candidate email is required"),
    resume: yup
      .mixed<FileList>()
      .required("PDF file is required")
      .test("fileType", "Only PDF files are allowed", (value) => {
        return value && value[0]?.type === "application/pdf";
      })
      .test("fileSize", "File size should be less than 2MB", (value) => {
        return value && value[0]?.size <= 2 * 1024 * 1024;
      }),
  })
  .required();

// ✅ Props
type InterviewFormProps = {
  mode: "create" | "edit";
  interviewId?: string;
  defaultValues?: Partial<InterviewFormInputs>;
};

export default function InterviewForm({
  mode,
  interviewId,
  defaultValues,
}: InterviewFormProps) {
  const form = useForm<InterviewFormInputs>({
    resolver: yupResolver(interviewFormSchema),
    defaultValues,
  });

  const onSubmit = (data: InterviewFormInputs) => {
    if (mode === "create") {
      console.log("Creating interview:", data);
      // 🔥 call POST API here
    } else {
      console.log("Updating interview:", interviewId, data);
      // 🔥 call PUT/PATCH API here
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-card p-6 rounded-lg shadow-md"
      >
        {/* Interview Title */}
        <FormField
          control={form.control}
          name="interviewTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter interview title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Interview Type */}
        <FormField
          control={form.control}
          name="interviewType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Technical, HR, Managerial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Candidate Name */}
        <FormField
          control={form.control}
          name="candidateName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Candidate Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter candidate name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Candidate Email */}
        <FormField
          control={form.control}
          name="candidateEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Candidate Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter candidate email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter any notes or details..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resume */}
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Candidate Resume (PDF)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => field.onChange(e.target.files as FileList)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {mode === "create" ? "Schedule Interview" : "Update Interview"}
        </Button>
      </form>
    </Form>
  );
}
