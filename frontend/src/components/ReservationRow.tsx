import { Checkbox, TableCell, TableRow } from "@mui/material"
import { format, parseISO } from "date-fns"
import * as React from 'react'
import { useQuery } from "react-query"
import { getUserbyId } from "../services/api"
import { IReservation, IUser } from "../utils/sharedInterfaces"

interface IReservationRowProps {
  reservation: IReservation
  isSelected: boolean
  onClick: (event: React.MouseEvent<unknown>, id: number) => void
}

const ReservationRow = ({ reservation, isSelected, onClick: onClick }: IReservationRowProps) => {
  let name = `${reservation.user_id}`
  const labelId = `contacts-table-checkbox-${reservation.id}`

  const { data, isFetched } = useQuery<IUser, Error>(['reservations', reservation.user_id], () => getUserbyId(reservation.user_id))

  if (isFetched) name = `${data!.first_name} ${data!.last_name}`.replace(/\s+/g, " ").trim()

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        onClick={event => onClick(event, reservation.id)}
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
          sx={{ display: { xs: "none", sm: "none", md: "table-cell", lg: "table-cell", xl: "table-cell" } }} >{reservation.facility}</TableCell>
        <TableCell
          align="left"
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }} >
          {format(parseISO(reservation.time), "do MMM yyyy 'at' K:mm a")}
        </TableCell>
      </TableRow>
    </>
  )
}

export { ReservationRow }
