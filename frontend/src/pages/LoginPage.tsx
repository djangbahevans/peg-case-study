import { Alert, AlertColor, Backdrop, Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useMutation } from "react-query"
import { useAuth } from "../contexts"


const LoginPage = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [modalState, setModalState] = useState<{ open: boolean, detail: string, severity: AlertColor }>(
    { open: false, detail: "", severity: "success" });

  const { login } = useAuth()

  const mutation = useMutation(login, {
    onError: (e) => setModalState({ open: true, detail: `Could not log in. Please try again later.`, severity: "error" })
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
      }}>
        <Paper sx={{ padding: 3 }}>
          <Typography align="center" variant="h5" sx={{ paddingBottom: 2 }}>
            Log In
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                type="text"
                sx={{ paddingBottom: 2 }}
                onChange={(e) => { setUsername(e.target.value) }}
                value={username}
                autoComplete="username"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                sx={{ paddingBottom: 2 }}
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
                autoComplete="current-password"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={async () => {
                  mutation.mutateAsync({ username: username, password })
                }}
                fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Button sx={{ marginTop: 1 }} href="/signup" variant="text" fullWidth>Don't have an account?</Button>
      </Box>
      <Snackbar autoHideDuration={6000} open={modalState.open} onClose={handleModalClose} >
        <Alert severity={modalState.severity} sx={{ width: '100%' }} onClose={() => { mutation.reset() }}>
          {modalState.detail}
        </Alert>
      </Snackbar>
    </div>
  )
}

export { LoginPage }

