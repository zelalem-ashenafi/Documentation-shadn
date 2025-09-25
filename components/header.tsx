"use client"

import Image from "next/image"
import { Search, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar" 
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type HeaderProps = {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    router.push("/login")
  }

  return (
    <header
      className={`flex items-center justify-between px-4 border-b bg-white h-14 ${className}`}
    >
      {/* Left side: Logo + Breadcrumb */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Wegagen Logo"
              width={230}
              height={48}
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <SidebarTrigger className="h-6 w-6 text-gray-600 hover:text-black" />
          <span className="font-medium">Documentation</span>
        </div>
      </div>

      {/* Right side: Search + Logout */}
      <div className="flex items-center gap-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search documentation..."
            className="pl-9 pr-16 w-64"
          />
          <kbd className="absolute right-3 text-xs text-gray-500 border rounded px-1.5 py-0.5 bg-gray-50">
            ⌘K
          </kbd>
        </div>

        {/* Logout button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="cursor-pointer bg-[#e65f05] flex items-center gap-1 hover:bg-black hover:text-white text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}
