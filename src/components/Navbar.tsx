'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/features/theme-toggle'
import { Logo } from '@/components/features/logo'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-secondary/65 backdrop-blur supports-[backdrop-filter]:bg-secondary/40">
      <div className="container flex h-16 px-6 items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild>
            <Link href="/login">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
