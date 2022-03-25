import { useState } from "react"
import { Outlet } from "react-router-dom"
import { PersistentDrawer, PrimarySearchAppBar } from "../components"


const Dashboard = () => {
  const swapDrawerState = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [open, setOpen] = useState(false)

  return (
    <>
      <PrimarySearchAppBar onMenuClick={swapDrawerState} open={open} />
      <PersistentDrawer open={open} onDrawerClose={handleDrawerClose}>
        <Outlet />
      </PersistentDrawer>
    </>
  )
}

export { Dashboard }

