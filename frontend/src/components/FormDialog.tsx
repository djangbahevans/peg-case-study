import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { ReactNode } from "react";

interface IAddUserDialogProps {
  open: boolean
  onClose: (value?: "cancel" | "confirm") => void
  children: ReactNode | ReactNode[]
}

export const FormDialog = ({ onClose, open, children }: IAddUserDialogProps) => (
  <div>
    <Dialog open={open} onClose={() => onClose("cancel")}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose("cancel")}>Cancel</Button>
        <Button onClick={() => {
          onClose("confirm");
        } }>Confirm</Button>
      </DialogActions>
    </Dialog>
  </div>
)
export { }
