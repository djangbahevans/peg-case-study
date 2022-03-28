import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import * as React from 'react';


export interface IConfirmationDialogProps {
  open: boolean;
  title: string;
  onClose: (value: "cancel" | "confirm") => void;
  children: React.ReactNode | React.ReactNode[]
}

export const ConfirmDialog = ({ onClose, open, title, children }: IConfirmationDialogProps) => (
  <Dialog
    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
    maxWidth="xs"
    open={open}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent dividers>
      {children}
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={() => onClose("cancel")}>
        Cancel
      </Button>
      <Button onClick={() => onClose("confirm")}>Ok</Button>
    </DialogActions>
  </Dialog>
)
