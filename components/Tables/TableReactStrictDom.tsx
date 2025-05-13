import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { css, html } from 'react-strict-dom'
import { radii, space } from '../../code/theme.stylex'
import { costColumns, EducationCost, eduColumns } from './utils'


const columnHelper = createColumnHelper<EducationCost>()

const columns = eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <html.span style={styles.cellValue}>{col}</html.span>,
    cell: (info) => <html.span style={costColumns.has(col) ? styles.cellValueCost : styles.cellValue}>{info.renderValue()}</html.span>,
    footer: (info) => <html.span style={styles.cellValue}>{info.column.id}</html.span>,
  })
)

export function TableReactStrictDom({ dataset }: { dataset: EducationCost[] }) {
  const [data, _setData] = useState(dataset)

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <html.div style={styles.table}>
      <html.div>
        {table.getHeaderGroups().map((headerGroup) => (
          <html.div key={headerGroup.id} style={[styles.row, styles.grayRow]}>
            {headerGroup.headers.map((header) => (
              <html.div key={header.id} style={styles.cell}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </html.div>
            ))}
          </html.div>
        ))}
      </html.div>
      <html.div>
        {table.getRowModel().rows.map((row, idx) => (
          <html.div
            key={row.id}
            style={[styles.row, idx % 2 === 1 ? styles.grayRow : {}]}
          >
            {row.getVisibleCells().map((cell) => (
              <html.div key={cell.id} style={styles.cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </html.div>
            ))}
          </html.div>
        ))}
      </html.div>
    </html.div>
  )
}

const styles = css.create({
  table: {
    borderRadius: radii.$2_5,
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: space.rowPadding,
  },
  grayRow: {
    backgroundColor: '#eee',
  },
  cell: {
    flex: 1,
    flexBasis: 0,
  },
  cellValue: {
    color: 'black',
    fontFamily: 'sans-serif',
  },
  cellValueCost: {
    color: 'green',
    fontFamily: 'sans-serif',
  },
  header: {
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 10,
  },
})
