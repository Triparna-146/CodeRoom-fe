// components/dashboard/Statistics.tsx
"use client"

import { StatsCard } from "./StatsCard"

export function Statistics() {
  const stats = [
    { title: "Interviews Scheduled for Today", value: 2 },
    { title: "Scheduled Interviews", value: 5 },
    { title: "Completed Interviews", value: 12 },
    { title: "Average Candidate Score", value: "78%" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <StatsCard key={idx} title={stat.title} value={stat.value} />
      ))}
    </div>
  )
}
