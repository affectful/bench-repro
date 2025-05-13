import styled from '@emotion/styled'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { costColumns, EducationCost, eduColumns } from './utils'

const columnHelper = createColumnHelper<EducationCost>()

const columns = eduColumns.map((col) =>
  columnHelper.accessor(col, {
    header: () => <CellValue>{col}</CellValue>,
    cell: (info) => {
      const variant = costColumns.has(col) ? 'cost' : undefined
      return <CellValue valueType={variant}>{info.renderValue()}</CellValue>
    },
    footer: (info) => <CellValue>{info.column.id}</CellValue>,
  })
)

export function TableEmotionWeb({ dataset }: { dataset: EducationCost[] }) {
  const [data, _setData] = useState(dataset)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <div>
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
      </div>
      <div>
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
      </div>
    </Table>
  )
}

const Table = styled.div`
  border-radius: ${({ theme }) => String(theme.radii.$2_5)}px;
  border-width: 1px;
  overflow: hidden;
  border-color: ${({ theme }) => theme.colors.border};
`
Table.displayName = 'Table'

const Row = styled.div<{ gray: boolean }>`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.space.rowPadding}px`};
  
  background-color: ${(props) => (props.gray ? props.theme.colors.grayBg : 'unset')};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grayBgHover};
    color: #fff;
  }
`
Row.displayName = 'Row'

const Cell = styled.div({
  flex: 1,
  flexBasis: 0,
})

const CellValue = styled.div<{
  valueType?: 'cost'
}>`
  ${props => props.valueType === 'cost' ?
    `color: ${props.theme.colors.green};`
    : `color: black;`
  }
`

Cell.displayName = 'Cell'
