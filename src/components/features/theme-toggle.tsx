
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  size?: string // pass tailwind size classes like "h-6 w-6"
  className?: string // to style the button itself
}

export function ThemeToggle({ size = "h-[1.2rem] w-[1.2rem]", className }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={className}
    >
      <Sun className={`absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${size}`} />
      <Moon className={`rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${size}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

