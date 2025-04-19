import { Bitcoin } from 'lucide-react'
import { Link } from 'react-router'

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-4 mx-4 sm:px-0 border-b">
      <Link to="/" className="flex items-center">
        <Bitcoin className="size-8 text-amber-600" />
        <h1 className="text-xl font-semibold tracking-tight">Cryton</h1>
      </Link>
    </header>
  )
}
