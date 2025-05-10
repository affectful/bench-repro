import styled from '@emotion/native'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { View, Text } from 'react-native'
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

export function TableEmotion() {
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

const Table = styled.View({
  borderRadius: 6,
  borderWidth: 1,
})
Table.displayName = 'Table'

const Row = styled.View<{ gray: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 16px;
  background-color: ${(props) => (props.gray ? '#eee' : 'unset')};
`
Row.displayName = 'Row'

const Cell = styled.View({
  flex: 1,
  flexBasis: 0,
})
Cell.displayName = 'Cell'
