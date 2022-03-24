import { useState } from "react"
import { PaymentsTable, PersistentDrawer, PrimarySearchAppBar } from "../components"


const PaymentsPage = () => {
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
        <PaymentsTable />
      </PersistentDrawer>
    </>
  )
}

export { PaymentsPage }
