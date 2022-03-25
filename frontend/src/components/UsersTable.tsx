import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Alert, AlertColor, AlertTitle, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Paper, Skeleton, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { format } from "date-fns";
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { approveUser, createUser, deleteUser, getUsers } from '../services/api';
import { IPaginateResponse, IUser, IUserCreate } from "../utils/sharedInterfaces";
import { processHobbies } from '../utils/utilitiyFunctions';
import { UserRow } from './UserRow';

interface IUsersTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

interface IUsersTableToolbarProps {
  numSelected: number;
  onAdd: () => void;
  onApprove: () => void;
  onDelete: () => void;
}

interface IAddUserDialogProps {
  onClose: () => void
  onCancel?: () => void
  onConfirm: ({
    first_name, last_name, dob, address, hobbies, national_id
  }: IUserCreate) => void
}

const AddUserDialog = ({ onClose, onConfirm }: IAddUserDialogProps) => {
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [dob, setDoB] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [address, setAddress] = useState<string>("");
  const [hobbies, setHobbies] = useState<string>("");
  const [national_id, setNationalId] = useState<string>("");
  const [is_admin, setIsAdmin] = useState<boolean>(false)

  return (
    <div>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new user
          </DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            fullWidth
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            fullWidth
            value={last_name}
            onChange={e => setLastName(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Date of Birth"
            type="date"
            fullWidth
            value={dob}
            onChange={e => setDoB(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Address"
            type="text"
            fullWidth
            value={address}
            onChange={e => setAddress(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="Hobbies (Comma separated)"
            type="text"
            fullWidth
            value={hobbies}
            onChange={e => setHobbies(e.target.value)}
            variant="standard"
          />
          <TextField
            margin="dense"
            id="name"
            label="National ID"
            type="text"
            fullWidth
            value={national_id}
            onChange={e => setNationalId(e.target.value)}
            variant="standard"
          />
          <FormControlLabel control={<Checkbox onChange={e => setIsAdmin(e.target.value === "on")} />} label="Admin?" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            onConfirm({
              first_name,
              last_name,
              dob,
              address,
              hobbies: processHobbies(hobbies),
              national_id,
              is_admin
            });
            onClose();
          }}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function UsersTableHead(props: IUsersTableProps) {
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
          Username
        </TableCell>
        <TableCell
          align="left"
          padding='normal'
          sx={{ display: { xs: "none", sm: "none", md: "table-cell", lg: "table-cell", xl: "table-cell" } }}
        >
          DoB
        </TableCell>
        <TableCell
          align="left"
          padding='normal'
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }}
        >
          National ID
        </TableCell>
        <TableCell
          align="left"
          padding='normal'
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }}
        >
          Approved?
        </TableCell>
        <TableCell
          align="left"
          padding='normal'
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "table-cell", xl: "table-cell" } }}
        >
          Amount Paid
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const UsersTableToolbar = (props: IUsersTableToolbarProps) => {
  const { numSelected, onAdd, onApprove, onDelete } = props;

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
          Users
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Tooltip title={`Approve user${numSelected > 1 ? ("s") : ""}`}>
            <IconButton onClick={onApprove}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" onClick={onDelete}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
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

export default function UsersTable() {
  const rowsPerPageOptions = [10, 50, 100]
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalState, setModalState] = useState<{ open: boolean, detail: string, severity: AlertColor }>({ open: false, detail: "", severity: "success" });
  const [rowsPerPage, setRowsPerPage] = useState(Math.min(...rowsPerPageOptions));

  const queryClient = useQueryClient()
  const createUserMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users")
      setModalState({ open: true, detail: "Successfully created user", severity: "success" })
    },
    onError: () => {
      setModalState({ open: true, detail: "Failed to create user", severity: "error" })
    }
  })
  const approveUserMutation = useMutation(approveUser, {
    onSuccess: (response) => {
      queryClient.invalidateQueries("users")
      setModalState({ open: true, detail: `User approved. Password is ${response.password}`, severity: "success" })
    },
    onError: () => {
      setModalState({ open: true, detail: "Failed to approve user", severity: "error" })
    }
  })
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users")
      setModalState({ open: true, detail: `User successfully deleted.`, severity: "success" })
    },
    onError: () => {
      setModalState({ open: true, detail: "Failed to delete user", severity: "error" })
    }
  })
  const { data, isError, isLoading } = useQuery<IPaginateResponse<IUser[]>, Error>(['users', page, rowsPerPage], getUsers)
  const users = data?.data

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = users!.map((n) => n.id);
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

  const handleModalClose = () => {
    setModalState({ ...modalState, open: false })
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogConfirm = (user_props: IUserCreate) => {
    createUserMutation.mutateAsync({ ...user_props })
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApprove = () => {
    users!.forEach(user => {
      if (!selected.includes(user.id)) return
      if (!user.is_active)
        approveUserMutation.mutateAsync(user.username)
    })
  }

  const handleDelete = () => {
    users!.forEach(user => {
      if (!selected.includes(user.id)) return
      deleteUserMutation.mutateAsync(user.id)
      setSelected([])
    })
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  if (isLoading)
    return <Skeleton variant="rectangular" sx={{ width: "95vw", height: "60vh", margin: "0 auto" }} />
  if (isError)
    return <Alert severity='error'>
      <AlertTitle>Error</AlertTitle>
      Error reading users
    </Alert>
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <UsersTableToolbar onDelete={handleDelete} onApprove={handleApprove} onAdd={handleDialogOpen} numSelected={selected.length} />
          <TableContainer>
            <Table
              // sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='medium'
            >
              <UsersTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={users!.length}
              />
              <TableBody>
                {users!
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);

                    return (
                      <UserRow key={row.id} handleClick={handleClick} user={row} isSelected={isItemSelected} />
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
      {dialogOpen && <AddUserDialog onConfirm={handleDialogConfirm} onClose={handleDialogClose} />}
      <Snackbar open={modalState.open} onClose={handleModalClose}>
        <Alert onClose={handleModalClose} severity={modalState.severity} sx={{ width: '100%' }}>
          {modalState.detail}
        </Alert>
      </Snackbar>
    </>
  );
}

export { UsersTable };

