import type { Meta, StoryObj } from '@storybook/react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from './Table'

const meta: Meta<typeof Table> = {
  component: Table,
}
export default meta

type Story = StoryObj<typeof Table>

// Empty Table
export const EmptyTable: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableCell>Column 1</TableCell>
            <TableCell>Column 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody />
      </Table>
    </TableContainer>
  ),
}

// Table with data
export const TableWithData: Story = {
  render: (args) => (
    <TableContainer>
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableCell>Column 1</TableCell>
            <TableCell>Column 2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Data 1.1</TableCell>
            <TableCell>Data 1.2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data 2.1</TableCell>
            <TableCell>Data 2.2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  ),
}
