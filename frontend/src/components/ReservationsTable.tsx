import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { AlertTitle, Alert, Box, Checkbox, IconButton, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ReservationRow } from ".";
import { getReservations, createReservation } from '../services/api';
import { IReservation, IPaginateResponse, IReservationCreate } from "../utils/sharedInterfaces";
import { format } from "date-fns"

interface IReservationsTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

interface IReservationsTableToolbarProps {
  numSelected: number;
  handleAdd: () => void;
}

interface IAddUserDialogProps {
  handleClose: () => void
  handleCancel?: () => void
  handleConfirm: ({ facility, time }: IReservationCreate) => void
}

const AddUserDialog = ({ handleClose, handleConfirm }: IAddUserDialogProps) => {
  const [time, setTime] = useState<string>(format(new Date(), "yyyy-MM-dd'T'hh:mm"));
  const [facility, setFacility] = useState<"Swimming Pool" | "Tennis Court" | "Gym" | "Conference Room">("Swimming Pool");

  const options = ["Swimming Pool", "Tennis Court", "Gym", "Conference Room"]

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Make a new reservation
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Facility</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={facility}
              label="Age"
              // @ts-ignore
              onChange={(e) => setFacility(e.target.value)}
            >
              {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="name"
            label="Time"
            type="datetime-local"
            fullWidth
            value={time}
            onChange={e => setTime(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { handleConfirm({ facility, time }); handleClose(); }}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function ReservationsTableHead(props: IReservationsTableProps) {
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
          Facility
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

const ReservationsTableToolbar = (props: IReservationsTableToolbarProps) => {
  const { numSelected, handleAdd } = props;

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
          Reservations
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
          <Tooltip title="Add">
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </Tooltip>
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

export default function ReservationsTable() {
  const rowsPerPageOptions = [10, 50, 100]
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(Math.min(...rowsPerPageOptions));

  const queryClient = useQueryClient()
  const mutation = useMutation(createReservation, {
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries("reservations"), 2000)
    }
  })
  const { data, isError, isLoading } = useQuery<IPaginateResponse<IReservation[]>, Error>(['reservations', page, rowsPerPage], getReservations)
  const reservations = data?.data

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = reservations!.map((n) => n.id);
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

  const handleDialogConfirm = ({ facility, time }: IReservationCreate) => {
    mutation.mutateAsync({
      facility,
      time
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
      Error reading reservations
    </Alert>
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <ReservationsTableToolbar handleAdd={handleDialogOpen} numSelected={selected.length} />
          <TableContainer>
            <Table
              // sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='medium'
            >
              <ReservationsTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={reservations!.length}
              />
              <TableBody>
                {reservations!.slice()
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);

                    return (
                      <ReservationRow key={row.id} handleClick={handleClick} reservation={row} isSelected={isItemSelected} />
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

export { ReservationsTable };