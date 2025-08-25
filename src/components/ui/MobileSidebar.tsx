"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../sidebar/Sidebar";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        <Menu size={24} />
      </button>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          
          {/* Sidebar */}
          <div className="relative ml-auto h-full w-64 bg-[#0f172a] p-6 shadow-xl">
            <button
              className="absolute top-4 right-4 text-white hover:text-red-500"
              onClick={() => setOpen(false)}
            >
              <X size={24} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
