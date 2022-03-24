import { useState } from "react"
import { ReservationsTable, PersistentDrawer, PrimarySearchAppBar } from "../components"


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
        <ReservationsTable />
      </PersistentDrawer>
    </>
  )
}

export { HomePage }
