import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { IProviderProps, IThemeContext, themeContextDefautls } from "../utils/sharedInterfaces"

const themeContext = createContext<IThemeContext>(themeContextDefautls)

export const AppThemeProvider = ({ children }: IProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">("light")

  useEffect(() => {
    let colormode = localStorage.getItem("color-mode")
    if (colormode === "light" || colormode === "dark") {
      setMode(colormode)
    }
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark")
    }
    else {
      setMode("light")
    }
  }, [])

  const theme = useMemo(() => {
    return createTheme({ palette: { mode } })
  }, [mode])

  const value = {
    toggleTheme: () => {
      const new_mode = mode === "light" ? "dark" : "light"
      setMode(new_mode)
      localStorage.setItem("color-mode", new_mode)
    },
    mode
  }

  return (
    <themeContext.Provider value={value}>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  )
}

const ThemeConsumer = () => useContext(themeContext)

export { ThemeConsumer as useTheme }

