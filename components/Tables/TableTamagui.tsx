import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { styled, View, Text } from 'tamagui'
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

export function TableTamagui() {
  const [data, _setData] = useState(dataset)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <View>
        {table.getHeaderGroups().map((headerGroup) => (
          <Row key={headerGroup.id} gray>
            {headerGroup.headers.map((header) => (
              <Cell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Cell>
            ))}
          </Row>
        ))}
      </View>
      <View>
        {table.getRowModel().rows.map((row, idx) => {
          return (
            <Row key={row.id} gray={idx % 2 === 0}>
              {row.getVisibleCells().map((cell) => (
                <Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Cell>
              ))}
            </Row>
          )
        })}
      </View>
    </Table>
  )
}

const Table = styled(View, {
  name: 'Table',
  borderRadius: 6,
  borderWidth: 1,
})

const Row = styled(View, {
  name: 'Row',
  display: 'flex',
  flexDirection: 'row',
  padding: 16,

  variants: {
    gray: {
      true: {
        backgroundColor: '#eee',
      },
    },
  } as const,
})

const Cell = styled(View, {
  name: 'Cell',
  flex: 1,
  flexBasis: 0,
})
