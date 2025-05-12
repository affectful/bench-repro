import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Text, View } from 'react-native'
import { costColumns, EducationCost, eduColumns } from './utils'

const columnHelper = createColumnHelper<EducationCost>()

const columns = eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <Text className={styles.cellValue}>{col}</Text>,
    cell: (info) => <Text className={costColumns.has(col) ? styles.cellValueCost : styles.cellValue}>{info.renderValue()}</Text>,
    footer: (info) => <Text className={styles.cellValue}>{info.column.id}</Text>,
  })
)

export function TableNativeWind({ dataset }: { dataset: EducationCost[] }) {
  const [data, _setData] = useState(dataset)

  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <View className={styles.table}>
      <View>
        {table.getHeaderGroups().map((headerGroup) => (
          <View key={headerGroup.id} className={`${styles.row} ${styles.grayRow}`}>
            {headerGroup.headers.map((header) => (
              <View key={header.id} className={styles.cell}>
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
            className={`${styles.row} ${idx % 2 === 1 ? styles.grayRow : ''}`}
          >
            {row.getVisibleCells().map((cell) => (
              <View key={cell.id} className={styles.cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = {
  table: 'rounded-lg overflow-hidden border border-gray-300',
  row: 'flex flex-row p-2',
  grayRow: 'bg-gray-200',
  cell: 'flex-1 basis-0',
  cellValue: 'text-black',
  cellValueCost: 'text-green-500',
  header: 'text-uppercase font-bold text-sm',
}
  // row: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   padding: theme.space.rowPadding,
  // },
  // grayRow: {
  //   backgroundColor: theme.colors.grayBg,
  // },
  // cell: {
  //   flex: 1,
  //   flexBasis: 0,
  // },
  // cellValue: {
  //   color: 'black',
  // },
  // cellValueCost: {
  //   color: theme.colors.green,
  // },
  // header: {
  //   textTransform: 'uppercase',
  //   fontWeight: 500,
  //   fontSize: 10,
  // },
// }


// const styles = {
//   table: {
//     borderRadius: theme.radii.$2_5,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
//   row: {
//     display: 'flex',
//     flexDirection: 'row',
//     padding: theme.space.rowPadding,
//   },
//   grayRow: {
//     backgroundColor: theme.colors.grayBg,
//   },
//   cell: {
//     flex: 1,
//     flexBasis: 0,
//   },
//   cellValue: {
//     color: 'black',
//   },
//   cellValueCost: {
//     color: theme.colors.green,
//   },
//   header: {
//     textTransform: 'uppercase',
//     fontWeight: 500,
//     fontSize: 10,
//   },
// }
