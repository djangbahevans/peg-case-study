import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Alert, AlertColor, AlertTitle, Box, Checkbox, DialogContentText, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Skeleton, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { format } from "date-fns";
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ConfirmDialog, FormDialog, ReservationRow } from ".";
import { createReservation, deleteReservation, getReservations } from '../services/api';
import { IPaginateResponse, IReservation } from "../utils/sharedInterfaces";

interface IReservationsTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

interface IReservationsTableToolbarProps {
  numSelected: number;
  onAdd: () => void;
  onDelete: () => void;
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
  const { numSelected, onAdd, onDelete } = props;

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
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Add">
            <IconButton onClick={onAdd}>
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

const ReservationsTable = () => {
  const rowsPerPageOptions = [10, 50, 100]
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createConfDialog, setCreateConfDialog] = useState(false);
  const [deleteConfDialog, setDeleteConfDialog] = useState(false);
  const [modalState, setModalState] = useState<{ open: boolean, detail: string, severity: AlertColor }>(
    { open: false, detail: "", severity: "success" });
  const [rowsPerPage, setRowsPerPage] = useState(Math.min(...rowsPerPageOptions));
  const [time, setTime] = useState<string>(format(new Date(), "yyyy-MM-dd'T'hh:mm"));
  const [facility, setFacility] = useState<"Swimming Pool" | "Tennis Court" | "Gym" | "Conference Room">("Swimming Pool");

  const options = ["Swimming Pool", "Tennis Court", "Gym", "Conference Room"]

  const queryClient = useQueryClient()
  const createReservationMutation = useMutation(createReservation, {
    onSuccess: () => {
      queryClient.invalidateQueries("reservations")
      setModalState({ open: true, detail: `Reservation successfully booked.`, severity: "success" })
    },
    onError: () => {
      setModalState({ open: true, detail: "Failed to book reservation", severity: "error" })
    }
  })
  const deleteReservationMutation = useMutation(deleteReservation, {
    onSuccess: () => {
      queryClient.invalidateQueries("reservations")
      setModalState({ open: true, detail: `Reservation successfully deleted.`, severity: "success" })
    },
    onError: () => {
      setModalState({ open: true, detail: "Failed to delete reservation", severity: "error" })
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

  const handleDialogClose = (value?: "cancel" | "confirm") => {
    if (value === "confirm") {
      setCreateConfDialog(true)
    }
    else {
      setFacility("Swimming Pool")
      setTime(format(new Date(), "yyyy-MM-dd'T'hh:mm"))
    }
    setDialogOpen(false)
  }

  const handleCreateConfClose = (value?: "cancel" | "confirm") => {
    if (value === "confirm")
      createReservationMutation.mutateAsync({
        facility,
        time
      })
      setCreateConfDialog(false)
      setTime(format(new Date(), "yyyy-MM-dd'T'hh:mm"))
      setFacility("Swimming Pool")
  }

  const handleDeleteConfClose = (value?: "cancel" | "confirm") => {
    if (value === "confirm") {
      reservations!.forEach(reservation => {
        if (!selected.includes(reservation.id)) return
        deleteReservationMutation.mutateAsync(reservation.id)
        setSelected([])
      })
    }

    setDeleteConfDialog(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    setDeleteConfDialog(true)
  }

  const handleModalClose = () => {
    setModalState({ ...modalState, open: false })
  }

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
          <ReservationsTableToolbar onDelete={handleDelete} onAdd={handleDialogOpen} numSelected={selected.length} />
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
                      <ReservationRow key={row.id} onClick={handleClick} reservation={row} isSelected={isItemSelected} />
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
      <FormDialog open={dialogOpen} onClose={handleDialogClose}>
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
      </FormDialog>
      <ConfirmDialog title={"Create reservation"} open={createConfDialog} onClose={handleCreateConfClose}>
        Are you sure you want to create this reservation?
      </ConfirmDialog>
      <ConfirmDialog title={"Delete reservation"} open={deleteConfDialog} onClose={handleDeleteConfClose}>
        Are you sure you want to delete this reservation?
      </ConfirmDialog>
      <Snackbar open={modalState.open} onClose={handleModalClose}>
        <Alert onClose={handleModalClose} severity={modalState.severity} sx={{ width: '100%' }}>
          {modalState.detail}
        </Alert>
      </Snackbar>
    </>
  );
}

export { ReservationsTable };

