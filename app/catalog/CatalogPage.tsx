"use client"

import { useEffect, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState
} from "@tanstack/react-table"

import { ArrowUpDown } from "lucide-react"

type CatalogRow = {
  id:number
  report_name:string
  main_folder:string
  sub_folder:string
  report_link:string
}

export default function CatalogPage({ catalogId }: { catalogId: string }) {

  const [data,setData] = useState<CatalogRow[]>([])
  const [globalFilter,setGlobalFilter] = useState("")
  const [sorting,setSorting] = useState<SortingState>([])

  useEffect(()=>{

    async function loadData(){
      const res = await fetch(`/api/catalog?bi=${catalogId}`)
      const result = await res.json()
      setData(result.rows)
    }

    loadData()

  },[catalogId])

  const columns:ColumnDef<CatalogRow>[] = [

    {
      header:"Report Name",
      accessorKey:"report_name"
    },

    {
      header:"Main Folder",
      accessorKey:"main_folder"
    },

    {
      header:"Sub Folder",
      accessorKey:"sub_folder"
    },

    {
      header:"Report Link",
      accessorKey:"report_link",
      cell:({getValue})=>{
        const url=getValue() as string
        return(
          <a
            href={url}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Open
          </a>
        )
      }
    }

  ]

  const table = useReactTable({
    data,
    columns,
    state:{globalFilter,sorting},
    onGlobalFilterChange:setGlobalFilter,
    onSortingChange:setSorting,
    getCoreRowModel:getCoreRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    getSortedRowModel:getSortedRowModel()
  })

  return(

  <div className="p-6 max-w-7xl">

    <h1 className="text-xl font-semibold mb-4">
      Catalog {catalogId}
    </h1>

    <input
      placeholder="Search reports..."
      value={globalFilter ?? ""}
      onChange={(e)=>setGlobalFilter(e.target.value)}
      className="border rounded-md p-2 mb-4 w-full"
    />

    <div className="border rounded-lg shadow-sm">

    <table className="w-[full] text-xs">

      <thead className="bg-[#E26B0A] text-white">

        {table.getHeaderGroups().map(headerGroup=>(
          <tr key={headerGroup.id}>

            {headerGroup.headers.map(header=>(

              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="p-3 text-left font-medium cursor-pointer select-none"
              >

                <div className="flex items-center gap-1">

                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <ArrowUpDown size={14}/>

                </div>

              </th>

            ))}

          </tr>
        ))}

      </thead>

      <tbody>

        {table.getRowModel().rows.map(row=>(

          <tr
            key={row.id}
            className="border-t hover:bg-gray-50"
          >

            {row.getVisibleCells().map(cell=>(

              <td
                key={cell.id}
                className="p-3 text-xs break-words max-w-[300px]"
              >

                {flexRender(
                  cell.column.columnDef.cell ??
                  cell.column.columnDef.accessorKey,
                  cell.getContext()
                )}

              </td>

            ))}

          </tr>

        ))}

      </tbody>

    </table>

    </div>

  </div>

  )

}