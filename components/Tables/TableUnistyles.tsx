import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { costColumns, EducationCost, eduColumns } from './utils'

const columnHelper = createColumnHelper<EducationCost>()

const columns = eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <Text style={styles.cellValue}>{col}</Text>,
    cell: (info) => {
      styles.useVariants({ valueType: costColumns.has(col) ? 'cost' : undefined })
      return (<Text style={styles.cellValue}>{info.renderValue()}</Text>)
    },
    footer: (info) => <Text style={styles.cellValue}>{info.column.id}</Text>,
  })
)

export function TableUnistyles({ dataset }: { dataset: EducationCost[] }) {
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

const styles = StyleSheet.create(theme => ({
  table: {
    borderRadius: theme.radii.$2_5,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.space.rowPadding,
    variants: {
      color: {
        gray: {
          backgroundColor: theme.colors.grayBg,
        },
      },
    },
  },
  cell: {
    flex: 1,
    flexBasis: 0,
  },
  cellValue: {
    variants: {
      valueType: {
        default: {
          color: 'black',
        },
        cost: {
          color: theme.colors.green,
        }
      }
    }
  },
}))
