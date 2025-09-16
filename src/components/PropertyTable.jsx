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
      cell: () => <a href="#" className="text-blue-500">Link</a>,
    }),
    columnHelper.display({
      header: 'Share',
      cell: () => (
        <button className="text-gold-500">
          <Share2Icon size={16} />
        </button>
      ),
    }),
    columnHelper.display({
      header: 'Detail',
      cell: ({ row }) => (
        <Link
          to={`/properties/${row.original.pid}`}
          className="text-indigo-500"
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
      <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
        No data available.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white sticky top-0">
          {getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
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
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanSort() && (
                    <span>
                      {table.getState().sorting.find(
                        s => s.id === header.column.id
                      )?.desc
                        ? ' 🔽'
                        : ' 🔼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
      onClick={() => onExport(data)}
      className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-full flex items-center hover:shadow-md transition"
        >
        <Download size={16} className="mr-2" /> Export to Excel
      </button>
    </div>
  )
}

export default PropertyTable
