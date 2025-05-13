import { lightTheme, Theme } from '@/code/objectTheme'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react'
import { costColumns, EducationCost, eduColumns } from './utils'


const columnHelper = createColumnHelper<EducationCost>()

const columns = (styles: ReturnType<typeof useStyles>) => eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <span style={styles.cellValue}>{col}</span>,
    cell: (info) => <span style={costColumns.has(col) ? styles.cellValueCost : styles.cellValue}>{info.renderValue()}</span>,
    footer: (info) => <span style={styles.cellValue}>{info.column.id}</span>,
  })
)

export function TableReactWeb({ dataset }: { dataset: EducationCost[] }) {
  const [data, _setData] = useState(dataset)
  const styles = useStyles(lightTheme)

  const table = useReactTable({
    data,
    columns: columns(styles),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div style={styles.table}>
      <div>
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} style={{...styles.row, ...styles.grayRow}}>
            {headerGroup.headers.map((header) => (
              <div key={header.id} style={styles.cell}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        {table.getRowModel().rows.map((row, idx) => (
          <div
            key={row.id}
            style={{...styles.row, ...(idx % 2 === 1 ? styles.grayRow : {}) }}
          >
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} style={styles.cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

type DivStyle = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>['style']

const useStyles = (theme: Theme) => ({
  table: {
    borderRadius: theme.radii.$2_5,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.space.rowPadding,
  } as DivStyle,
  grayRow: {
    backgroundColor: theme.colors.grayBg,
  },
  cell: {
    flex: 1,
    flexBasis: 0,
  },
  cellValue: {
    color: 'black',
  },
  cellValueCost: {
    color: theme.colors.green,
  },
  header: {
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: 10,
  },
})
