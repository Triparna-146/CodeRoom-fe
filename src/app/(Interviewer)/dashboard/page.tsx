import { UpcomingInterviewsTable } from "@/components/interviews/UpcomingInterviewsTable";
import { Statistics } from "@/components/dashboard/statistics/Statistics";
import React from "react";

const page = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-6 p-5">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-wide">
          Welcome to your Dashboard,
        </h1>
      </div>

      <div className="w-full py-6 space-y-6">
        <h2 className="text-xl font-normal tracking-wide">Statistics</h2>
        <Statistics />
      </div>

      <div className="w-full py-6 space-y-6">
        <h2 className="text-xl font-normal tracking-wide">
          Upcoming Interviews
        </h2>
        <UpcomingInterviewsTable />
      </div>
    </div>
  );
};

export default page;
