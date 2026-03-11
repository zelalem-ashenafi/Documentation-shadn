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
// Types
// --------------------

// Each node can have _pages and nested subsections
interface SectionNode {
  _pages?: string[];
  [subSection: string]: SectionNode | string[] | undefined;
}

// Top-level layout structure: main_tab -> SectionNode
interface LayoutStructure {
  [mainTab: string]: SectionNode;
}

// Raw layout items from API
interface LayoutItem {
  main_tab: string;
  sub_section?: string;
  page_name: string;
}

// --------------------
// Helper to structure layout data
// --------------------
function groupLayoutData(layoutData: LayoutItem[]): LayoutStructure {
  const structure: LayoutStructure = {};

  layoutData.forEach((row) => {
    const { main_tab, sub_section, page_name } = row;

    if (!structure[main_tab]) structure[main_tab] = {};

    if (sub_section && sub_section.trim() !== "") {
      if (!structure[main_tab][sub_section]) structure[main_tab][sub_section] = {};
      const subNode = structure[main_tab][sub_section] as SectionNode;
      if (!subNode._pages) subNode._pages = [];
      subNode._pages.push(page_name);
    } else {
      const mainNode = structure[main_tab];
      if (!mainNode._pages) mainNode._pages = [];
      mainNode._pages.push(page_name);
    }
  });

  return structure;
}

// --------------------
// Render function for menu recursively
// --------------------
function renderMenu(content: SectionNode, basePath: string = "") {
  return Object.entries(content).map(([key, value]) => {
    // _pages array at current level
    if (key === "_pages" && Array.isArray(value)) {
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

    // Nested object (subsection)
    if (typeof value === "object" && value !== null) {
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
              <SidebarMenuSub>{renderMenu(value as SectionNode, path)}</SidebarMenuSub>
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
  const [layout, setLayout] = useState<LayoutStructure | null>(null);

  useEffect(() => {
    async function fetchLayout() {
      try {
        const res = await fetch("/api/layout");
        const data: LayoutItem[] = await res.json();
        const structured = groupLayoutData(data);
        setLayout(structured);
      } catch (err: unknown) {
        if (err instanceof Error) console.error("Error loading layout:", err.message);
        else console.error("Unexpected error loading layout:", err);
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
            <SidebarMenu className="text-xs">{renderMenu(layout)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
  <SidebarGroupLabel>Report Catalogs</SidebarGroupLabel>
  <SidebarGroupContent>
    <SidebarMenu>

      <SidebarMenuSubItem key={'/catalog/70'}>
          <Link href={'/catalog/70'} className="w-full flex items-center">
            <FileText size={15} className="mr-2" />
            <span className="text-xs capitalize">{'70(new!)'}</span>
          </Link>
        </SidebarMenuSubItem> 
      <SidebarMenuSubItem key={'/catalog/99'}>
          <Link href={'/catalog/99'} className="w-full flex items-center">
            <FileText size={15} className="mr-2" />
            <span className="text-xs capitalize">{'99'}</span>
          </Link>
        </SidebarMenuSubItem>
      <SidebarMenuSubItem key={'/catalog/126'}>
          <Link href={'/catalog/126'} className="w-full flex items-center">
            <FileText size={15} className="mr-2" />
            <span className="text-xs capitalize">{'126'}</span>
          </Link>
        </SidebarMenuSubItem>

      

    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
