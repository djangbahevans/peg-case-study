import { Alert, Backdrop, Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useMutation } from "react-query"
import { createUser } from "../services/api"
import { IError } from "../utils/sharedInterfaces"
import { processHobbies } from "../utils/utilitiyFunctions"

const SignupPage = () => {
  const [first_name, setFirstName] = useState("")
  const [firstNameError] = useState("")
  const [last_name, setLastName] = useState("")
  const [lastNameError] = useState("")
  const [dobError] = useState("")
  const [dob, setDob] = useState("1993-08-09")
  const [address, setAddress] = useState("")
  const [addressError] = useState("")
  const [national_id, setNationalID] = useState("")
  const [nationalIDError] = useState("")
  const [hobbies, setHobbies] = useState("")
  const [error] = useState("")

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      // TODO: TELL USER TO EXPECT AWAIT APPROVAL
    }
  })

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
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First name"
                variant="outlined"
                type="text"
                helperText={firstNameError}
                onChange={e => { setFirstName(e.target.value) }}
                error={!!firstNameError}
                autoComplete="given-name"
                required
                fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last name"
                variant="outlined"
                type="text"
                helperText={lastNameError}
                onChange={e => setLastName(e.target.value)}
                error={!!lastNameError}
                autoComplete="family-name"
                required
                fullWidth />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Date of birth"
                variant="outlined"
                type="date"
                helperText={dobError}
                onChange={(e) => { setDob(e.target.value) }}
                error={!!dobError}
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
                helperText={addressError}
                onChange={(e) => { setAddress(e.target.value) }}
                error={!!addressError}
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
                helperText={nationalIDError}
                onChange={(e) => { setNationalID(e.target.value) }}
                error={!!nationalIDError}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Hobbies (Comma separated)"
                variant="outlined"
                type="text"
                helperText={nationalIDError}
                onChange={(e) => { setHobbies(e.target.value) }}
                value={hobbies}
                error={!!nationalIDError}
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
      <Snackbar autoHideDuration={6000} open={mutation.isError} onClose={() => { mutation.reset() }}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={() => { mutation.reset() }}>
          {mutation.error ? (mutation.error as IError).detail : ""}
        </Alert>
      </Snackbar>
    </div >
  )
}

export { SignupPage }
