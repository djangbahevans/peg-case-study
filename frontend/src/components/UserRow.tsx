import { Checkbox, TableCell, TableRow } from "@mui/material"
import { format, parseISO } from "date-fns"
import * as React from 'react'
import { IUser } from "../utils/sharedInterfaces"

interface IUserRowProps {
  user: IUser
  isSelected: boolean
  onClick: (event: React.MouseEvent<unknown>, id: number) => void
}

const UserRow = ({ user, isSelected, onClick }: IUserRowProps) => {
  const name = `${user.first_name} ${user.last_name}`.replace(/\s+/g, " ").trim()
  const labelId = `contacts-table-checkbox-${user.id}`

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        onClick={event => onClick(event, user.id) }
        aria-checked={isSelected}
        tabIndex={-1}
        key={name}
        selected={isSelected}
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          {name}
        </TableCell>
        <TableCell
          align="left"
          sx={{ display: { xs: "none", sm: "none", md: "table-cell", lg: "table-cell", xl: "table-cell" } }} >
          {user.username}
        </TableCell>
        <TableCell
          align="left"
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }} >
          {format(parseISO(user.dob), "do MMM yyyy")}
        </TableCell>
        <TableCell
          align="left"
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }} >
          {user.national_id}
        </TableCell>
        <TableCell
          align="left"
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }} >
          {user.is_active.toString()}
        </TableCell>
        <TableCell
          align="left"
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }} >
          {user.amount_paid}
        </TableCell>
      </TableRow>
    </>
  )
}

export { UserRow }

