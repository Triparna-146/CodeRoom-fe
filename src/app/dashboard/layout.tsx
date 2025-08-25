import Sidebar from "@/components/sidebar/Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <main className="flex-1 lg:ml-64 p-6">{children}</main>
    </div>
  )
}
