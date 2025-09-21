"use client"

import Image from "next/image"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar" // ✅ import trigger

type HeaderProps = {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={`flex items-center justify-between px-4 border-b bg-white h-14 ${className}`}
    >
      {/* Left side: Logo + Breadcrumb */}
      <div className="flex items-center gap-4">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Wegagen Logo"
            width={24}
            height={24}
          />
          <span className="font-semibold text-lg">Wegagen Bank SC</span>
        </div>

        {/* Breadcrumb / Page title */}
        <div className="flex items-center gap-2 text-gray-600">
          {/* Sidebar toggle button */}
          <SidebarTrigger className="h-6 w-6 text-gray-600 hover:text-black" />
          <span className="font-medium">Documentation</span>
        </div>
      </div>

      {/* Right side: Search */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search documentation..."
          className="pl-9 pr-16 w-64"
        />
        {/* Keyboard shortcut hint */}
        <kbd className="absolute right-3 text-xs text-gray-500 border rounded px-1.5 py-0.5 bg-gray-50">
          ⌘K
        </kbd>
      </div>
    </header>
  )
}
