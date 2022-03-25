import { Alert, AlertColor, Backdrop, Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useMutation } from "react-query"
import { createUser } from "../services/api"
import { processHobbies } from "../utils/utilitiyFunctions"

const SignupPage = () => {
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [dob, setDob] = useState("1993-08-09")
  const [address, setAddress] = useState("")
  const [national_id, setNationalID] = useState("")
  const [hobbies, setHobbies] = useState("")
  const [modalState, setModalState] = useState<{ open: boolean, detail: string, severity: AlertColor }>(
    { open: false, detail: "", severity: "success" });

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      setModalState({ open: true, detail: `Account created. Kindly await approval.`, severity: "success" })
    },
    onError: () => {
      setModalState({ open: true, detail: `Failed to create account. Please try again later`, severity: "error" })
    }
  })

  const handleModalClose = () => {
    setModalState({ ...modalState, open: false })
  }

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={mutation.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{
        maxWidth: '400px',
        minWidth: '250px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}><Paper sx={{ padding: 3 }}>
          <Typography align="center" variant="h5" sx={{ paddingBottom: '10px' }}>
            Sign up
          </Typography>
          <Grid spacing={1} container>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First name"
                variant="outlined"
                type="text"
                onChange={e => { setFirstName(e.target.value) }}
                autoComplete="given-name"
                required
                fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last name"
                variant="outlined"
                type="text"
                onChange={e => setLastName(e.target.value)}
                autoComplete="family-name"
                required
                fullWidth />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Date of birth"
                variant="outlined"
                type="date"
                onChange={(e) => { setDob(e.target.value) }}
                value={dob}
                autoComplete="bday"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                variant="outlined"
                type="text"
                onChange={(e) => { setAddress(e.target.value) }}
                autoComplete="street-address"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="National ID"
                variant="outlined"
                type="text"
                onChange={(e) => { setNationalID(e.target.value) }}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Hobbies (Comma separated)"
                variant="outlined"
                type="text"
                onChange={(e) => { setHobbies(e.target.value) }}
                value={hobbies}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                onClick={async () => {
                  mutation.mutateAsync({
                    first_name,
                    last_name,
                    dob,
                    address: address,
                    hobbies: processHobbies(hobbies),
                    national_id,
                    is_admin: false
                  })
                }}
                fullWidth>
                Create account
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Button href="/login" sx={{ marginTop: 1 }} variant="text" fullWidth>Already have an account?</Button>
      </Box>
      <Snackbar autoHideDuration={6000} open={modalState.open} onClose={handleModalClose} >
        <Alert severity={modalState.severity} sx={{ width: '100%' }} onClose={() => { mutation.reset() }}>
          {modalState.detail}
        </Alert>
      </Snackbar>
    </div >
  )
}

export { SignupPage }

