"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { CustomCodeBlock } from "@/components/codeBlock"
import { ChevronRight } from "lucide-react"
import sqlFormatter from "@sqltools/formatter"

export default function DocPage() {
  const pathname = usePathname()
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Example: /branch-operations/ifb → ["branch-operations", "ifb"]
  const pathParts = pathname.split("/").filter(Boolean)

  // Convert hyphens to spaces (for DB matching)
  const main_tab = pathParts[0] ? decodeURIComponent(pathParts[0].replace(/-/g, " ")) : null
  const sub_section = pathParts.length === 3 ? decodeURIComponent(pathParts[1].replace(/-/g, " ")) : ""
  const page_name = pathParts[pathParts.length - 1]
    ? decodeURIComponent(pathParts[pathParts.length - 1].replace(/-/g, " "))
    : null

  useEffect(() => {
    const fetchSections = async () => {
      if (!main_tab || !page_name) return
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams({
          main_tab,
          sub_section,
          page_name,
        })

        const res = await fetch(`/api/content?${params.toString()}`)
        if (!res.ok) throw new Error(`Failed to fetch content: ${res.status}`)
        const data = await res.json()
        setSections(data)
      } catch (err: any) {
        console.error("Fetch error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSections()
  }, [pathname])

  // Breadcrumb display
  const Breadcrumb = () => (
    <div className="flex items-center text-xs text-gray-500 mb-4">
      {pathParts.map((segment, index) => (
        <div key={index} className="flex items-center">
          <span className="capitalize">{decodeURIComponent(segment.replace(/-/g, " "))}</span>
          {index < pathParts.length - 1 && (
            <ChevronRight className="mx-2 h-4 w-4" />
          )}
        </div>
      ))}
    </div>
  )

  // UI states
  if (loading) return <p className="p-4 text-gray-500">Loading...</p>
  if (error)
    return (
      <div className="p-6">
        <Breadcrumb />
        <p className="text-red-500">{error}</p>
      </div>
    )
  if (sections.length === 0)
    return (
      <div className="p-6">
        <Breadcrumb />
        <p className="text-gray-600">No content found for this page.</p>
      </div>
    )

  // ✅ Render page sections
  return (
    <div className="p-6 space-y-8">
      <Breadcrumb />
      {sections.map((section, idx) => (
        <div key={idx} className="border rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-2">{section.section_title}</h2>
          {section.description && (
            <p className="text-gray-600 mb-4">{section.description}</p>
          )}

          {section.columns && section.columns.length > 0 && (
            <>
              <h3 className="font-medium mb-2">Columns</h3>
              <ul className="list-disc list-inside space-y-1 mb-4">
                {section.columns.map((col: any, i: number) => (
                  <li key={i}>
                    <span className="font-mono text-sm text-gray-800">{col.name}</span>
                    {col.description && <span className="text-gray-500"> – {col.description}</span>}
                  </li>
                ))}
              </ul>
            </>
          )}

          {section.sqlquery && (
            <>
              <h3 className="font-medium mb-2">SQL Query</h3>
              <CustomCodeBlock
                sqlCode={sqlFormatter.format(section.sqlquery, {
                  language: "sql",
                  indent: "  ",
                })}
              />
            </>
          )}
        </div>
      ))}
    </div>
  )
}
