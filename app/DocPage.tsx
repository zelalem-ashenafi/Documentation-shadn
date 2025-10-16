"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { CustomCodeBlock } from "@/components/codeBlock"
import { ChevronRight } from "lucide-react"
import { format } from "sql-formatter" // 🆕 import formatter

export default function DocPage() {
  const pathname = usePathname()
  const [contentData, setContentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const pathParts = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/content")
        if (!res.ok) throw new Error("Failed to load content")
        const data = await res.json()
        setContentData(data)
      } catch (err: any) {
        console.error("Error fetching content:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <p className="p-4 text-gray-500">Loading content...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>
  if (!contentData) return <p className="p-4 text-gray-500">No content available.</p>

  // walk through JSON
  let current: any = contentData
  for (const part of pathParts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part]
    } else {
      current = undefined
      break
    }
  }

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
    return (
      <div className="p-6">
        <Breadcrumb />
        <p className="text-gray-600">No documentation found for this section.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      <Breadcrumb />
      {current.map((table: any, idx: number) => {
        // 🆕 Format SQL cleanly
        const formattedSQL = table.sqlQuery
          ? format(table.sqlQuery, { language: "plsql", indent: "  " })
          : ""

        return (
          <div key={idx} className="border rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{table.title}</h2>
            {table.description && (
              <p className="text-gray-600 mb-4">{table.description}</p>
            )}
            {table.columns && table.columns.length > 0 && (
              <>
                <h3 className="font-medium mb-2">Columns</h3>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  {table.columns.map((col: any, i: number) => (
                    <li key={i}>
                      <span className="font-mono text-sm">{col.name}</span> – {col.description}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {formattedSQL && (
              <>
                <h3 className="font-medium mb-2">SQL Query</h3>
                <CustomCodeBlock sqlCode={formattedSQL} />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
