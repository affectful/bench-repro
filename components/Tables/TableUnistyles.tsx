import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import dataset from './education_costs.json'
import { EducationCost, eduColumns } from './utils'

const columnHelper = createColumnHelper<EducationCost>()

const columns = eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <Text>{col}</Text>,
    cell: (info) => <Text>{info.renderValue()}</Text>,
    footer: (info) => <Text>{info.column.id}</Text>,
  })
)

export function TableUnistyles() {
  const [data, _setData] = useState(dataset)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <View style={styles.table}>
      <View>
        {table.getHeaderGroups().map((headerGroup) => {
          styles.useVariants({ color: 'gray' })
          return (
            <View key={headerGroup.id} style={[styles.row]}>
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
          )
        })}
      </View>
      <View>
        {table.getRowModel().rows.map((row, idx) => {
          const isEven = idx % 2 === 1
          styles.useVariants({ color: isEven ? 'gray' : undefined })
          return (
            <View key={row.id} style={[styles.row]}>
              {row.getVisibleCells().map((cell) => (
                <View key={cell.id} style={styles.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </View>
              ))}
            </View>
          )
        })}
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
    variants: {
      color: {
        gray: {
          backgroundColor: '#eee',
        },
      },
    },
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
