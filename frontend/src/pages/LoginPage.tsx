import { Alert, Backdrop, Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useMutation } from "react-query"
import { useAuth } from "../contexts"
import { forgotPassword } from "../services/api"
import { IError } from "../utils/sharedInterfaces"


const LoginPage = () => {
  const [username, setUsername] = useState<string>("")
  const [usernameError] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordError] = useState<string>("")
  const [error, setError] = useState<string>("")

  const { login } = useAuth()

  const loginMutation = useMutation(login)
  const forgotPasswordMutation = useMutation(forgotPassword, {
    onError: (data) => {
      setError((data as IError).detail)
    }
  })

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loginMutation.isLoading || forgotPasswordMutation.isLoading}
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
              <Typography color="error" paragraph>{error}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                type="text"
                helperText={usernameError}
                sx={{ paddingBottom: 2 }}
                onChange={(e) => { setUsername(e.target.value) }}
                value={username}
                error={!!usernameError}
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
                helperText={passwordError}
                sx={{ paddingBottom: 2 }}
                onChange={(e) => { setPassword(e.target.value) }}
                value={password}
                error={!!passwordError}
                autoComplete="current-password"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={async () => {
                  if (passwordError || usernameError) return

                  loginMutation.mutateAsync({ username: username, password })
                }}
                fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Button sx={{ marginTop: 1 }} href="/signup" variant="text" fullWidth>Don't have an account?</Button>
      </Box>
      <Snackbar autoHideDuration={6000} open={loginMutation.isError} onClose={() => { loginMutation.reset() }}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={() => { loginMutation.reset() }}>
          {loginMutation.error ? (loginMutation.error as Error)?.message : ""}
        </Alert>
      </Snackbar>
    </div>
  )
}

export { LoginPage }

