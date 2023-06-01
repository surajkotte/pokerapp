import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useState } from "react";
import "../styles/dialogbox.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Data1 from "./Data1";
import Data2 from "./Data2";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';


export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(props.openDialog);
  const [loading, setLoading] = useState(false);

  const [buttonClick, setButtonClick] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.closeDialog(false);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleBtnClick = (e) => {
    if (e.target.name === "btn1") {
      setButtonClick(false);
    } else {
      setButtonClick(true);
    }
  };

  React.useEffect(() => setOpen(props.openDialog), [props.openDialog]);

  return (
    <>
      <Dialog open={open} maxWidth="800px">
        <DialogTitle onClose={handleClose}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <div className="ButtonGRP">
              <Button
                id={buttonClick ? "" : "data1btn"}
                style={{ borderRight: "blue", width: "50%", color: "black" }}
                onClick={handleBtnClick}
                name="btn1"
              >
                Player Data1
              </Button>
              <Button
                id={buttonClick ? "data2btn" : ""}
                style={{ borderRight: "blue", width: "50%", color: "black" }}
                onClick={handleBtnClick}
                name="btn2"
              >
                PLayer Data2
              </Button>
            </div>
          </Box>
        </DialogTitle>
        <DialogContent>
          {!buttonClick ? <Data1 ItemDetails={props.ItemDetails} /> : <Data2 ItemDetails={props.ItemDetails}/>}
        </DialogContent>
      </Dialog>
    </>
  );
}

