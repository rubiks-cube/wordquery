
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import AlertBox from "./alertBox"
import DialogTitle from "@mui/material/DialogTitle";
function DialogBox({text,onClear}) {
    const descriptionElementRef = React.useRef<any>(null);
    const [open, setOpen] = React.useState(true);
    const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const handleClose = () => {
    setOpen(false);
    onClear();
  };
  return (
<Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Word Query</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
        <AlertBox text={text} onClear={onClear}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
            </Dialog>
  )
}

export default DialogBox