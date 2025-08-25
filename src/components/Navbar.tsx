'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/features/theme-toggle'
import { Logo } from '@/components/features/logo'
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {

  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          {pathname === "/" && !isLoggedIn && (
            <Button asChild>
            <Link href="/login">
              Get Started
            </Link>
          </Button>
          )}
          {/* Show Profile if Logged In */}
        {isLoggedIn && (
          <div className="flex items-center gap-2">
            <Button variant="secondary">
              <Link href="/profile" className="font-medium">
              <span className="rounded-full">👤</span>
              </Link>
            </Button>
            
            {/* <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button> */}
          </div>
        )}
        </div>
      </div>
    </header>
  )
}
