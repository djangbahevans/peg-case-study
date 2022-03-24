import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Alert, AlertTitle, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../contexts';
import { createPayment, getPayments } from '../services/api';
import { IPaginateResponse, IPayment, IPaymentCreate } from "../utils/sharedInterfaces";
import { PaymentRow } from './PaymentsRow';

interface IPaymentsTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

interface IPaymentsTableToolbarProps {
  numSelected: number;
  handleAdd: () => void;
}

interface IAddUserDialogProps {
  handleClose: () => void
  handleCancel?: () => void
  handleConfirm: ({ username, amount }: IPaymentCreate) => void
}

const AddUserDialog = ({ handleClose, handleConfirm }: IAddUserDialogProps) => {
  const [username, setUsername] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make new payment
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={e => setUsername(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value))}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { handleConfirm({ username, amount }); handleClose(); }}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function PaymentTableHead(props: IPaymentsTableProps) {
  const { onSelectAllClick, numSelected, rowCount } =
    props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        <TableCell
          align="left"
          padding='normal'
        >
          Name
        </TableCell>
        <TableCell
          align="left"
          padding='normal'
          sx={{ display: { xs: "none", sm: "none", md: "table-cell", lg: "table-cell", xl: "table-cell" } }}
        >
          Amount
        </TableCell>
        <TableCell
          align="left"
          padding='normal'
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }}
        >
          Time
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const PaymentsTableToolbar = (props: IPaymentsTableToolbarProps) => {
  const { numSelected, handleAdd } = props;
  const { user } = useAuth()

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Payments
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          {user?.is_admin && <Tooltip title="Add">
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </Tooltip>}
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

export default function PaymentsTable() {
  const rowsPerPageOptions = [10, 50, 100]
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(Math.min(...rowsPerPageOptions));

  const queryClient = useQueryClient()
  const mutation = useMutation(createPayment, {
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries("payments"), 2000)
    }
  })
  const { data, isError, isLoading } = useQuery<IPaginateResponse<IPayment[]>, Error>(
    ['payments', page, rowsPerPage],
    getPayments
  )
  const payments = data?.data

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = payments!.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogConfirm = ({ username, amount }: IPaymentCreate) => {
    mutation.mutateAsync({
      amount,
      username
    })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  if (isLoading)
    return <Skeleton variant="rectangular" sx={{ width: "95vw", height: "60vh", margin: "0 auto" }} />
  if (isError)
    return <Alert severity='error'>
      <AlertTitle>Error</AlertTitle>
      Error reading payments
    </Alert>
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <PaymentsTableToolbar handleAdd={handleDialogOpen} numSelected={selected.length} />
          <TableContainer>
            <Table
              // sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='medium'
            >
              <PaymentTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={payments!.length}
              />
              <TableBody>
                {payments!.slice()
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);

                    return (
                      <PaymentRow key={row.id} handleClick={handleClick} payment={row} isSelected={isItemSelected} />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={data!.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      {dialogOpen && <AddUserDialog handleConfirm={handleDialogConfirm} handleClose={handleDialogClose} />}
    </>
  );
}

export { PaymentsTable };
