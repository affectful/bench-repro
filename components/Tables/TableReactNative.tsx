import { lightTheme, Theme } from '@/code/objectTheme'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { costColumns, EducationCost, eduColumns } from './utils'

const columnHelper = createColumnHelper<EducationCost>()

const columns = (styles: ReturnType<typeof useStyles>) => eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <Text style={styles.cellValue}>{col}</Text>,
    cell: (info) => <Text style={costColumns.has(col) ? styles.cellValueCost : styles.cellValue}>{info.renderValue()}</Text>,
    footer: (info) => <Text style={styles.cellValue}>{info.column.id}</Text>,
  })
)

export function TableReactNative({ dataset }: { dataset: EducationCost[] }) {
  const [data, _setData] = useState(dataset)
  const styles = useStyles(lightTheme)

  const table = useReactTable({
    data,
    columns: columns(styles),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <View style={styles.table}>
      <View>
        {table.getHeaderGroups().map((headerGroup) => (
          <View key={headerGroup.id} style={[styles.row, styles.grayRow]}>
            {headerGroup.headers.map((header) => (
              <View key={header.id} style={styles.cell}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </View>
            ))}
          </View>
        ))}
      </View>
      <View>
        {table.getRowModel().rows.map((row, idx) => (
          <View
            key={row.id}
            style={[styles.row, idx % 2 === 1 ? styles.grayRow : null]}
          >
            {row.getVisibleCells().map((cell) => (
              <View key={cell.id} style={styles.cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

const useStyles = (theme: Theme) => StyleSheet.create({
  table: {
    borderRadius: theme.radii.$2_5,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.space.rowPadding,
  },
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
