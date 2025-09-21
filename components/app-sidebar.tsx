import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
 


// Recursive menu data

 
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

import { ChevronRight } from "lucide-react"
import { menuItems } from "./menuItems" // your constant from before

export function AppSidebar() {
  return (
    <Sidebar className="pt-14 w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel >Departments</SidebarGroupLabel>
          <SidebarGroupContent className="text-xs">
            <SidebarMenu className="text-xs">
              {menuItems.map((item) => (
                <Collapsible key={item.title} className="group/collapsible text-sm">
                  <SidebarMenuItem className="text-xs">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.icon && <item.icon className="mr-2" />}
                        <span className="text-xs">{item.title}</span>
                        {item.children && (
                          <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {item.children && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((sub) => (
                            <SidebarMenuSubItem key={sub.title}>
                              {sub.children ? (
                                <Collapsible className="group/collapsible">
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                      {sub.icon && <sub.icon className="mr-2" />}
                                      <span className="text-xs">{sub.title}</span>
                                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <SidebarMenuSub>
                                      {sub.children.map((subSub) => (
                                        <SidebarMenuSubItem key={subSub.title}>
                                          <a href={subSub.url} className="w-full">
                                            
                                            {subSub.title}
                                          </a>
                                        </SidebarMenuSubItem>
                                      ))}
                                    </SidebarMenuSub>
                                  </CollapsibleContent>
                                </Collapsible>
                              ) : (
                                <a href={sub.url} className="w-full">
                                  
                                  {sub.title}
                                </a>
                              )}
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
