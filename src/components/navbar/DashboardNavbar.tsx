// src/components/navbar/DashboardNavbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import  Sidebar  from "@/components/sidebar/Sidebar";
import { Logo } from "../features/logo";

export default function DashboardNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-secondary/65 backdrop-blur supports-[backdrop-filter]:bg-secondary/40">
      <div className="container flex h-16 px-6 items-center justify-between">
        {/* Left Section: Logo */}
        {/* <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div> */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-secondary"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div className="relative ml-auto h-full w-64 bg-[#0f172a] shadow-xl p-6 flex flex-col">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-red-500"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Sidebar Content */}
            <div className="mt-10 flex-1 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
