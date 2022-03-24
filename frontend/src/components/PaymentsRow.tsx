import { Checkbox, TableCell, TableRow } from "@mui/material"
import { format, parseISO } from "date-fns"
import * as React from 'react'
import { useQuery } from "react-query"
import { getUserbyId } from "../services/api"
import { IPayment, IUser } from "../utils/sharedInterfaces"

interface IPaymentRowProps {
  payment: IPayment
  isSelected: boolean
  handleClick: (event: React.MouseEvent<unknown>, id: number) => void
}

const PaymentRow = ({ payment, isSelected, handleClick }: IPaymentRowProps) => {
  let name = `${payment.user_id}`
  const labelId = `contacts-table-checkbox-${payment.id}`

  const { data, isFetched } = useQuery<IUser, Error>(['payments', payment.user_id], () => getUserbyId(payment.user_id))

  if (isFetched) name = `${data!.first_name} ${data!.last_name}`.replace(/\s+/g, " ").trim()

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        onClick={event => handleClick(event, payment.id)}
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
          sx={{ display: { xs: "none", sm: "none", md: "table-cell", lg: "table-cell", xl: "table-cell" } }} >{payment.amount}</TableCell>
        <TableCell
          align="left"
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }} >
          {format(parseISO(payment.created_at), "do MMM yyyy 'at' K:mm a")}
        </TableCell>
      </TableRow>
    </>
  )
}

export { PaymentRow }

