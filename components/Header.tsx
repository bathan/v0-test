import Link from 'next/link'
import { UserNav } from "@/components/user-nav"
import { Logo } from "@/components/logo"

export function Header() {
  return (
    <div className="border-b bg-primary">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Logo size={32} />
          <span className="text-xl font-bold text-white">Calice Farm Management</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  )
}

