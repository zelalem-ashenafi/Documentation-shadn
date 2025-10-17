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

// --------------------
// Helper to structure layout data
// --------------------
function groupLayoutData(layoutData: any[]) {
  const structure: any = {};

  layoutData.forEach((row) => {
    const { main_tab, sub_section, page_name } = row;

    if (!structure[main_tab]) structure[main_tab] = {};

    // If sub_section exists, nest it
    if (sub_section && sub_section.trim() !== "") {
  if (!structure[main_tab][sub_section]) structure[main_tab][sub_section] = {};
  if (!structure[main_tab][sub_section]._pages) structure[main_tab][sub_section]._pages = [];
  structure[main_tab][sub_section]._pages.push(page_name);
} else {
  // no subsection, push page directly
  if (!structure[main_tab]["_pages"]) structure[main_tab]["_pages"] = [];
  structure[main_tab]["_pages"].push(page_name);
}

  });

  return structure;
}

// --------------------
// Render function for menu
// --------------------
function renderMenu(content: any, basePath: string = "") {
  return Object.entries(content).map(([key, value]: [string, any]) => {
    
    if (key === "_pages" && Array.isArray(value)) {
    // Render pages at current basePath (do not append '_pages' to path)
    return value.map((page) => (
      <SidebarMenuSubItem key={`${basePath}/${page}`}>
        <Link href={`${basePath}/${page}`} className="w-full flex items-center">
          <FileText size={15} className="mr-2" />
          <span className="text-xs capitalize">{page}</span>
        </Link>
      </SidebarMenuSubItem>
    ));
  }
    const path = `${basePath}/${key}`;
    // If subsection has pages
    if (Array.isArray(value)) {
      return (
        <SidebarMenuSubItem key={path}>
          <Link href={path} className="w-full flex items-center">
            <FileText size={15} className="mr-2" />
            <span className="text-xs capitalize">{key}</span>
          </Link>
        </SidebarMenuSubItem>
      );
    }

    // If nested object (main_tab or sub_section with children)
    if (typeof value === "object") {
      return (
        <Collapsible key={path} className="group/collapsible text-sm">
          <SidebarMenuItem className="text-xs">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <FolderArchive className="mr-2" />
                <span className="text-xs capitalize">{key}</span>
                <ChevronRight className="ml-auto transition-transform" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>{renderMenu(value, path)}</SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    return null;
  });
}

// --------------------
// Main Sidebar Component
// --------------------
export function AppSidebar() {
  const [layout, setLayout] = useState<any>(null);

  useEffect(() => {
    async function fetchLayout() {
      try {
        const res = await fetch("/api/layout");
        const data = await res.json();
        const structured = groupLayoutData(data);
        setLayout(structured);
      } catch (err) {
        console.error("Error loading layout:", err);
      }
    }
    fetchLayout();
  }, []);

  if (!layout) {
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
              {renderMenu(layout)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
