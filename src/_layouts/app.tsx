import { Header } from '@/components/app/header'
import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="min-h-screen container mx-auto flex flex-col gap-4">
      <Header />

      <div className="flex-1 px-8 sm:px-4 mt-8">
        <Outlet />
      </div>
    </div>
  )
}
