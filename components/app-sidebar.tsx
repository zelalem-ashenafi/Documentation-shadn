"use client";

import React, { useEffect, useState } from "react";
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
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { ChevronRight, FileText, FolderArchive } from "lucide-react";
import Link from "next/link";

function renderMenu(content: any, basePath: string = "") {
  return Object.entries(content).map(([key, value]: [string, any]) => {
    const path = `${basePath}/${key}`;

    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return (
          <SidebarMenuSubItem key={path}>
            <Link href={path} className="w-full flex items-center">
              <FileText size={15} className="mr-2" />
              <span className="text-xs">{key}</span>
            </Link>
          </SidebarMenuSubItem>
        );
      } else {
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
        );
      }
    }
    return null;
  });
}

export function AppSidebar() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        
        setContent(data);
      } catch (err) {
        console.error("Error loading content:", err);
      }
    }
    fetchContent();
  }, []);

  if (!content) {
    return (
      <Sidebar collapsible="icon" className="pt-14 w-64 bg-gray-50">
        <SidebarContent>
          <p className="p-4 text-xs text-gray-500">Loading...</p>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" className="pt-14 w-64 bg-gray-50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Departments</SidebarGroupLabel>
          <SidebarGroupContent className="text-xs">
            <SidebarMenu className="text-xs">
              {renderMenu(content)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
