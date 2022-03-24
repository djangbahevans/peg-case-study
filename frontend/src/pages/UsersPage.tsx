import { useState } from "react"
import { PersistentDrawer, PrimarySearchAppBar, UsersTable } from "../components"


const UsersPage = () => {
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
        <UsersTable />
      </PersistentDrawer>
    </>
  )
}

export { UsersPage }

