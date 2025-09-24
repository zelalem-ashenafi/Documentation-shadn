"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

import { ChevronRight, FileText, FolderArchive } from "lucide-react"
import Link from "next/link"
import { documentationContent } from "@/app/content"

// Recursive renderer for menu items
function renderMenu(content: any, basePath: string = "") {
  return Object.entries(content).map(([key, value]: [string, any]) => {
    const path = `${basePath}/${key}`

    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        // Leaf node: array (e.g., tables), render key as a link
        return (
          <SidebarMenuSubItem key={path}>
            <Link href={path} className="w-full flex items-center">
              <FileText size={15} className="mr-2" />
              <span className="text-xs">{key}</span>
            </Link>
          </SidebarMenuSubItem>
        )
      } else {
        // Nested section: render collapsible and recurse
        return (
          <Collapsible key={path} className="group/collapsible text-sm">
            <SidebarMenuItem className="text-xs">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <FolderArchive className="mr-2" />
                  <span className="text-xs capitalize">{key}</span>
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>{renderMenu(value, path)}</SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      }
    }
    // Ignore non-object values, assuming structure is consistent
    return null
  })
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="pt-14 w-64 bg-gray-100">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Departments</SidebarGroupLabel>
          <SidebarGroupContent className="text-xs">
            <SidebarMenu className="text-xs">
              {renderMenu(documentationContent)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
