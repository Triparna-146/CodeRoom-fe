// "use client"

// import Link from "next/link"
// import { cn } from "@/lib/utils"
// import { Home, User, Settings } from "lucide-react"
// import { buttonVariants } from "@/components/ui/button"
// import { Logo } from "../features/logo"

// export default function Sidebar() {
//   return (
//     <aside className="fixed top-0 left-0 z-40 h-full w-64 border-r bg-background shadow-lg">
//       {/* Logo / Header */}
//       <div className="p-4 border-b flex items-center">
//           <Link href="/" className="flex items-center space-x-2">
//             <Logo />
//           </Link>
//         </div>

//       {/* Nav */}
//       <nav className="flex flex-col space-y-1 p-4">
//         <Link
//           href="/dashboard"
//           className={cn(
//             buttonVariants({ variant: "ghost" }),
//             "justify-start"
//           )}
//         >
//           <Home className="mr-2 h-4 w-4" />
//           Home
//         </Link>
//         <Link
//           href="/dashboard/profile"
//           className={cn(
//             buttonVariants({ variant: "ghost" }),
//             "justify-start"
//           )}
//         >
//           <User className="mr-2 h-4 w-4" />
//           Profile
//         </Link>
//         <Link
//           href="/dashboard/settings"
//           className={cn(
//             buttonVariants({ variant: "ghost" }),
//             "justify-start"
//           )}
//         >
//           <Settings className="mr-2 h-4 w-4" />
//           Settings
//         </Link>
//       </nav>
//     </aside>
//   )
// }

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  Settings,
  Menu,
  EllipsisVertical,
  Plus,
  List,
  ListChecks,
  LogOut,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "../features/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../features/theme-toggle";
import { useTheme } from "next-themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(
      `${apiUrl}/auth/logout`,
      {}, // no body needed
      {
        withCredentials: true, // IMPORTANT for cookie-based auth
      }
    );

      if (response.status === 201) {
        toast.success("Logged out successfully");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    }
  };

  const NavLinks = () => (
    <nav className="h-full px-4 py-8">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4 mb-4">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start w-full"
            )}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>

          <Link
            href="/interviews/new"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start w-full"
            )}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Interview
          </Link>

          <Link
            href="/interviews"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start w-full"
            )}
          >
            <List className="mr-2 h-4 w-4" />
            Scheduled Interviews
          </Link>

          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start w-full"
            )}
          >
            <ListChecks className="mr-2 h-4 w-4" />
            Completed Interviews
          </Link>
        </div>

        <div className="flex items-center justify-between bg-secondary rounded-md hover:bg-secondary/80 transition-colors">
          <Link
            href="/dashboard/profile"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start"
            )}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2">
                <EllipsisVertical className="h-4 w-4 mr-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-md">
              <DropdownMenuItem
                className="gap-2 cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <ThemeToggle className="h-4 w-4 bg-muted rounded-full" />
                {"Mode"}
                {/* you can also just put "Toggle Theme" text */}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex gap-2">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-red-600 cursor-pointer hover:bg-red-500 dark:hover:bg-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* <Link
        href="/dashboard/settings"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "justify-start"
        )}
      >
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Link> */}
    </nav>
  );

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="flex items-center justify-between p-4 border-b lg:hidden">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Menu className="h-6 w-6 cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="p-4 border-b flex items-center">
              <Logo />
            </div>
            <NavLinks />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:border-r lg:bg-background lg:shadow-lg lg:flex lg:flex-col">
        <div className="p-4 border-b flex items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <NavLinks />
      </aside>
    </>
  );
}
