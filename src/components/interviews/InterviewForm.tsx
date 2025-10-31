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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { use } from "react";
import axios from "axios";

// ✅ Form field types
type InterviewFormInputs = {
  interviewTitle: string;
  interviewType: string;
  description?: string;
  date: string;
  time: string;
  candidateName: string;
  candidateEmail: string;
  resume?: FileList;
};

const INTERVIEW_TYPES = ["technical", "hr", "managerial", "other"] as const;


// ✅ Validation schema (Yup v1 style)
const interviewFormSchema: yup.ObjectSchema<InterviewFormInputs> = yup
  .object({
    interviewTitle: yup.string().required("Interview title is required"),
    interviewType: yup.mixed<InterviewFormInputs["interviewType"]>()
      .oneOf(INTERVIEW_TYPES, "Invalid interview type")
      .required("Interview type is required"),
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
      .optional()
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

  const router = useRouter();

  const onSubmit = async (data: InterviewFormInputs) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      let resumeUrl = "";

      // 🧩 STEP 1: Upload resume to Cloudinary (if selected)
      if (data.resume && data.resume[0]) {
        const formData = new FormData();
        formData.append("resume", data.resume[0]);

        console.log("Uploading resume:", formData.get("resume"));

        const uploadRes = await axios.post(
          `${apiUrl}/cloudinary/upload`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        resumeUrl = uploadRes.data.url; // your backend should return { url: "https://..." }
      }

      console.log("Resume URL:", resumeUrl);
      

      const interviewPayload = {
        title: data.interviewTitle,
        type: data.interviewType,
        description: data.description,
        date: data.date,
        time: data.time,
        candidateName: data.candidateName,
        candidateEmail: data.candidateEmail,
        resumeUrl: resumeUrl || defaultValues?.resume, // keep old resume if editing
      };

      console.log("Interview Payload:", interviewPayload);

      if (mode === "create") {
        await axios.post(`${apiUrl}/interview/schedule`, interviewPayload, {
          withCredentials: true,
        });
        toast.success("Interview scheduled successfully!");
      } else {
        await axios.put(
          `${apiUrl}/interviews/${interviewId}`,
          interviewPayload,
          {
            withCredentials: true,
          }
        );
        toast.success("Interview updated successfully!");
      }

      // 🧩 STEP 4: Redirect
      router.push("/interviews");
    } catch (error: any) {
      console.error("Error submitting interview:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="mx-auto w-full justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 space-y-6 rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-10">
            {mode === "create" ? "Schedule New Interview" : "Update Interview"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Interview Title */}
            <FormField
              control={form.control}
              name="interviewTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interview Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter interview title"
                      {...field}
                      className="rounded-lg border px-3 py-5 shadow-sm"
                    />
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
                    <Input
                      placeholder="e.g. Technical, HR, Managerial"
                      {...field}
                      className="rounded-lg border px-3 py-5 shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <hr className="my-8" />

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-8">
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

          <hr className="my-8" />

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
                    className="resize-none bg-secondary/40 rounded-lg border px-3 py-5 shadow-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr className="my-8" />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Candidate Name */}
            <FormField
              control={form.control}
              name="candidateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter candidate name"
                      {...field}
                      className="rounded-lg border px-3 py-5 shadow-sm"
                    />
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
                    <Input
                      type="email"
                      placeholder="Enter candidate email"
                      {...field}
                      className="rounded-lg border px-3 py-5 shadow-sm"
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
                    <div className="flex items-center rounded-lg border px-3 py-2 shadow-sm bg-secondary/40">
                      {/* Hidden input */}
                      <input
                        id="resume-upload"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) =>
                          field.onChange(e.target.files as FileList)
                        }
                      />

                      {/* Styled button */}
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer rounded-md bg-violet-600 px-4 py-1 text-sm font-semibold text-white hover:bg-violet-700"
                      >
                        Upload
                      </label>

                      {/* File name display */}
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 truncate">
                        {field.value && field.value[0]
                          ? field.value[0].name
                          : "No file selected"}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="mt-5">
            {mode === "create" ? "Schedule Interview" : "Update Interview"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
