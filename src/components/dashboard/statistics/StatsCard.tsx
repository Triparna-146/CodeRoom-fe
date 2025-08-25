// components/dashboard/StatsCard.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type StatsCardProps = {
  title: string
  value: string | number
}

export function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card className="shadow-sm border border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-semibold text-foreground">{value}</p>
      </CardContent>
    </Card>
  )
}
