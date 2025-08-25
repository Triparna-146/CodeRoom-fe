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

"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Home, User, Settings, Menu } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Logo } from "../features/logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const NavLinks = () => (
    <nav className="flex flex-col space-y-1 p-4">
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "justify-start"
        )}
      >
        <Home className="mr-2 h-4 w-4" />
        Home
      </Link>
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
      <Link
        href="/dashboard/settings"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "justify-start"
        )}
      >
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Link>
    </nav>
  )

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
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <NavLinks />
      </aside>
    </>
  )
}

