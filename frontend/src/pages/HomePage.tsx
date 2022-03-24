import { useState } from "react"
import { Outlet } from "react-router-dom"
import { PersistentDrawer, PrimarySearchAppBar } from "../components"


const HomePage = () => {
  const swapDrawerState = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [open, setOpen] = useState(false)

  return (
    <>
      <PrimarySearchAppBar handleMenuClick={swapDrawerState} open={open} />
      <PersistentDrawer open={open} handleDrawerClose={handleDrawerClose}>
        <Outlet />
      </PersistentDrawer>
    </>
  )
}

export { HomePage }

