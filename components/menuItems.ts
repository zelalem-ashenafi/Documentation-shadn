// src/data/menuItems.ts
import { Home, Folder, FileText, Settings } from "lucide-react"

export type MenuItem = {
  title: string
  url?: string
  icon?: React.ElementType
  children?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    title: "Branch Operation",
    icon: Home,
    children: [
      {
        title: "Conventional (Conv)",
        icon: Folder,
        children: [
          { title: "Tables", url: "/branch-operation/conv/tables", icon: FileText },
          { title: "Account Classes", url: "/branch-operation/conv/account-classes", icon: FileText },
        ],
      },
      {
    title: "Interest-Free Banking (IFB)",
    icon: Home,
    children: [
      { title: "Tables", url: "/ifb/tables", icon: FileText },
      { title: "Account Classes", url: "/ifb/account-classes", icon: FileText },
    ],
  },
    ],
  },
  
  {
    title: "Finance",
    icon: Home,
    children: [
      { title: "Tables", url: "/finance/tables", icon: FileText },
      { title: "Account Classes", url: "/finance/account-classes", icon: FileText },
    ],
  },
  {
    title: "IBD (International Banking Department)",
    icon: Home,
    children: [
      { title: "Tables", url: "/ibd/tables", icon: FileText },
      { title: "Account Classes", url: "/ibd/account-classes", icon: FileText },
    ],
  },
  {
    title: "Credit",
    icon: Home,
    children: [
      { title: "Tables", url: "/credit/tables", icon: FileText },
      { title: "Account Classes", url: "/credit/account-classes", icon: FileText },
    ],
  },
  {
    title: "E-Banking",
    icon: Home,
    children: [
      { title: "Tables", url: "/ebanking/tables", icon: FileText },
      { title: "Account Classes", url: "/ebanking/account-classes", icon: FileText },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]
