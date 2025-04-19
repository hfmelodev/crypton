import { Bitcoin } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-4 sm:px-0 border-b">
      <div className="flex items-center gap-1">
        <Bitcoin className="size-8 text-amber-600" />
        <h1 className="text-xl font-semibold tracking-tight">Cryton</h1>
      </div>
    </header>
  )
}
