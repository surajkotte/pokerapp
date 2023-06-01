import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from '@mui/material/DialogActions';
import * as React from "react";
import { useState } from "react";
import "../styles/dialogbox.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Data1 from "./Data1";
import Data2 from "./Data2";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(props.openDialog);
  const [loading, setLoading] = useState(false);
  const [isDownlaodVisible , setIsDownloadVisible] = useState(true);
  var XLData = [];
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  
  const exportToCSV = () => {
    const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();

props.ItemDetails.map((Item)=>{
  var StartingChips = Item.startingBuyIn*50;
  var Money = Item.startingBuyIn*25;
  var onechipscost = 0.5;
  var profitorloss = Math.abs(Money-(Item.endingBid*onechipscost));
  if(StartingChips>Item.endingBid){
      profitorloss  = '-'+profitorloss;
  }
  XLData.push({
    row: Item.row,
    name: Item.name,
    buyins: Item.startingBuyIn,
    money: Money,
    startingChips:StartingChips,
    endingChips:Item.endingBid,
    profitloss: profitorloss,
  });
})

// we will display the date as DD-MM-YYYY 

let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
    var fileName = 'pokergame+ '+currentDate;
    const ws = XLSX.utils.json_to_sheet(XLData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

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
        <DialogActions>
          {isDownlaodVisible && <Button onClick={exportToCSV}><FileDownloadOutlinedIcon/> Download</Button>}
        </DialogActions>
      </Dialog>
    </>
  );
}

