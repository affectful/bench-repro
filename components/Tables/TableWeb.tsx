import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { eduColumns, EducationCost } from './utils'
import dataset from './education_costs.json'

const columnHelper = createColumnHelper<EducationCost>()

const columns = eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <span>{col}</span>,
    cell: (info) => <span>{info.renderValue()}</span>,
    footer: (info) => <span>{info.column.id}</span>,
  })
)

export function TableWeb() {
  const [data, _setData] = useState(dataset)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div style={styles.tableCtn}>
      <table style={styles.table}>
        <thead style={styles.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              style={{ ...styles.row, ...styles.grayRow }}
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={styles.cell}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, idx) => (
            <tr
              key={row.id}
              style={{
                ...styles.row,
                ...(idx % 2 === 1 ? styles.grayRow : {}),
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={styles.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  tableCtn: {
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  table: {
    fontWeight: 300,
    textAlign: 'left',
    fontSize: 12,
    boxSizing: 'border-box',
    borderCollapse: 'collapse',
    width: '100%',
    fontFamily: 'Arial',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
  },
  grayRow: {
    backgroundColor: '#eee',
  },
  cell: {
    flex: 1,
    flexBasis: 0,
  },
  header: {
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 10,
  },
} as const
