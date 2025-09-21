// src/components/PropertyTable.jsx
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { ArrowUpDown, Download, Share2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as XLSX from 'xlsx'

const columnHelper = createColumnHelper()

function PropertyTable({ data = [], onExport }) {
  console.log('PropertyTable data:', data); // Debug log

  const columns = [
    columnHelper.accessor('size_sqm', {
      header: 'Area (SQM)',
      enableSorting: true,
    }),
    columnHelper.accessor('price_etb', {
      header: 'Per SQM (BIRR)',
      cell: ({ row }) =>
        row.original.price_etb
          ? (row.original.price_etb / row.original.size_sqm).toFixed(2)
          : 'N/A',
      enableSorting: true,
    }),
    columnHelper.accessor('bedrooms', {
      header: 'Beds',
      enableSorting: true,
    }),
    columnHelper.accessor('floor_level', {
      header: 'Floor',
      enableSorting: true,
    }),
    columnHelper.accessor('title_deed', {
      header: 'Title Deed',
      cell: ({ value }) => (value ? 'Yes' : 'No'),
      enableSorting: true,
    }),
    columnHelper.accessor('created_at', {
      header: 'Listing Date',
      cell: ({ value }) =>
        value ? new Date(value).toLocaleDateString() : 'N/A',
      enableSorting: true,
    }),
    columnHelper.accessor('sold_date', {
      header: 'Sold Date',
      cell: ({ value }) =>
        value ? new Date(value).toLocaleDateString() : 'Not Sold',
      enableSorting: true,
    }),
    columnHelper.display({
      header: 'Listing Link',
      cell: () => <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">Link</a>,
    }),
    columnHelper.display({
      header: 'Share',
      cell: () => (
        <button className="text-theme-accent hover:text-yellow-600 transition-colors">
          <Share2Icon size={16} />
        </button>
      ),
    }),
    columnHelper.display({
      header: 'Detail',
      cell: ({ row }) => (
        <Link
          to={`/properties/${row.original.pid}`}
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          Detail
        </Link>
      ),
    }),
  ]

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
  })

  console.log('Table instance:', table) // Debug log

  const { getHeaderGroups, getRowModel } = table

  if (!data || data.length === 0) {
    return (
      <div className="bg-theme-secondary rounded-lg p-8 text-center border border-theme">
        <p className="text-theme-secondary text-lg">
          No data available.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0 z-10">
            {getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-blue-700 transition-colors text-white"
                    onClick={() =>
                      header.column.getCanSort() &&
                      table.setSorting([{
                        id: header.column.id,
                        desc: !table.getState().sorting.find(
                          s => s.id === header.column.id
                        )?.desc,
                      }])
                    }
                  >
                    <div className="flex items-center text-white">
                      <span className="text-white font-bold">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      {header.column.getCanSort() && (
                        <ArrowUpDown size={14} className="ml-2 text-white" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 divide-y divide-gray-200 dark:divide-gray-700">
            {getRowModel().rows.map((row, index) => (
              <tr key={row.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}`}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={() => onExport(data)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
        >
          <Download size={18} className="mr-2" /> Export to Excel
        </button>
      </div>
    </div>
  )
}

export default PropertyTable