import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { styled, Text, View } from 'tamagui'
import { costColumns, EducationCost, eduColumns } from './utils'

const columnHelper = createColumnHelper<EducationCost>()

const columns = eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <CellValue>{col}</CellValue>,
    cell: (info) => <CellValue valueType={costColumns.has(col) ? 'cost' : 'normal'}>{info.renderValue()}</CellValue>,
    footer: (info) => <CellValue>{info.column.id}</CellValue>,
  })
)

export function TableTamagui({ dataset }: { dataset: EducationCost[] }) {
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
            <Row key={row.id} gray={idx % 2 === 1}>
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
  rounded: '$2',
  borderWidth: 1,
  borderColor: '$borderColor',
})

const Row = styled(View, {
  name: 'Row',
  display: 'flex',
  flexDirection: 'row',
  p: '$2',

  variants: {
    gray: {
      true: {
        backgroundColor: '$backgroundPress',
      },
    },
  } as const,
})

const Cell = styled(View, {
  name: 'Cell',
  flex: 1,
  flexBasis: 0,
})

const CellValue = styled(Text, {
  name: 'CellValue',
  variants: {
    valueType: {
      normal: {
        color: 'black',
      },
      cost: {
        color: '$green10',
      },
    },
  } as const,
})
