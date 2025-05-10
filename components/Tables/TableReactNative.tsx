import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { eduColumns, EducationCost } from './utils'
import dataset from './education_costs.json'

const columnHelper = createColumnHelper<EducationCost>()

const columns = eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <Text>{col}</Text>,
    cell: (info) => <Text>{info.renderValue()}</Text>,
    footer: (info) => <Text>{info.column.id}</Text>,
  })
)

export function TableReactNative() {
  const [data, _setData] = useState(dataset)

  const table = useReactTable({
    data,
    columns,
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

const styles = StyleSheet.create({
  table: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
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
})
