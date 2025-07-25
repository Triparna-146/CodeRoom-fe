export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      {/* You can replace this with your actual logo */}
      <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">CR</span>
      </div>
      <span className="font-bold text-xl">CodeRoom</span>
    </div>
  )
}
