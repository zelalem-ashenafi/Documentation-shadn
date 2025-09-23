// src/data/menuItems.ts
import { Home, Folder, FileText, Settings, Building2, Banknote, MoonStar, Coins, LucideCircleDollarSign, LucideHandCoins, LucideSmartphoneNfc, LucideSmartphoneCharging, LucideSmartphone } from "lucide-react"

export type MenuItem = {
  title: string
  url?: string
  icon?: React.ElementType
  children?: MenuItem[]
}

export const menuItems: MenuItem[] = [
  {
    title: "Branch Operation",
    icon: Building2,
    children: [
      {
        title: "Conventional (Conv)",
        icon: Banknote,
        children: [
          { title: "Tables", url: "/branch-operation/conv/tables", icon: FileText },
          { title: "Account Classes", url: "/branch-operation/conv/account-classes", icon: FileText },
        ],
      },
      {
    title: "Interest-Free Banking (IFB)",
    icon: MoonStar,
    children: [
      { title: "Tables", url: "/branch-operation/ifb/tables", icon: FileText },
      { title: "Account Classes", url: "/branch-operation/ifb/account-classes", icon: FileText },
    ],
  },
    ],
  },
  
  {
    title: "Finance",
    icon: Coins,
    children: [
      { title: "Tables", url: "/finance/tables", icon: FileText },
      { title: "Account Classes", url: "/finance/account-classes", icon: FileText },
    ],
  },
  {
    title: "IBD (International Banking Department)",
    icon: LucideCircleDollarSign,
    children: [
      { title: "Tables", url: "/ibd/tables", icon: FileText },
      { title: "Account Classes", url: "/ibd/account-classes", icon: FileText },
    ],
  },
  {
    title: "Credit",
    icon: LucideHandCoins,
    children: [
      { title: "Tables", url: "/credit/tables", icon: FileText },
      { title: "Account Classes", url: "/credit/account-classes", icon: FileText },
    ],
  },
  {
    title: "E-Banking",
    icon: LucideSmartphone,
    children: [
      { title: "Tables", url: "/e-banking/tables", icon: FileText },
      { title: "Account Classes", url: "/e-banking/account-classes", icon: FileText },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]
