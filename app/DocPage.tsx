"use client"

import { usePathname } from "next/navigation"
import { documentationContent, Section, TableContent } from "./content"
import { CustomCodeBlock } from "@/components/codeBlock"
import { ChevronRight } from "lucide-react"

export default function DocPage() {
  const pathname = usePathname() // e.g. "/branch-operation/conv/account%20classes"
  const pathParts = pathname.split("/").filter(Boolean).map(segment => decodeURIComponent(segment)) // ["branch-operation", "conv", "account classes"]

  // Walk through nested object
  let current: Section | TableContent[] | undefined = documentationContent
  for (const part of pathParts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Section)[part]
    } else {
      current = undefined
      break
    }
  }

  // Breadcrumb component
  const Breadcrumb = () => (
    <div className="flex items-center text-xs text-gray-500 mb-4">
      {pathParts.map((segment, index) => (
        <div key={index} className="flex items-center">
          <span className="capitalize">{segment}</span>
          {index < pathParts.length - 1 && (
            <ChevronRight className="mx-2 h-4 w-4" />
          )}
        </div>
      ))}
    </div>
  )

  if (!current || !Array.isArray(current)) {
    return <p className="text-gray-600 p-4">No documentation found for this section.</p>
  }

  return (
    <div className="p-6 space-y-8">
      <Breadcrumb />
      {current.map((table, idx) => (
        <div key={idx} className="border rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">{table.title}</h2>
          {table.description && table.description.trim() !== "" && (
            <p className="text-gray-600 mb-4">{table.description}</p>
          )}
          {table.columns && table.columns.length > 0 && (
            <>
              <h3 className="font-medium mb-2">Columns</h3>
              <ul className="list-disc list-inside space-y-1 mb-4">
                {table.columns.map((col, i) => (
                  <li key={i}>
                    <span className="font-mono text-sm">{col.name}</span> – {col.description}
                  </li>
                ))}
              </ul>
            </>
          )}
          {table.sqlQuery && table.sqlQuery.trim() !== "" && (
            <>
              <h3 className="font-medium mb-2"></h3>
              <CustomCodeBlock sqlCode={table.sqlQuery} />
            </>
          )}
        </div>
      ))}
    </div>
  )
}