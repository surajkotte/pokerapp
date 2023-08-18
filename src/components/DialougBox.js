import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import { useState } from "react";
import "../styles/dialogbox.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Data1 from "./Data1";
import Data2 from "./Data2";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "../auth-context";
import { DataProvider } from "../calculation";
import SaveIcon from "@mui/icons-material/Save";
export default function AlertDialogSlide(props) {
  const context = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(props.openDialog);
  const [loading, setLoading] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [isDownlaodVisible, setIsDownloadVisible] = useState(true);
  var negativeBal = [];
  var positiveBal = [];
  var data1 = [];
  var XLData = [];
  var XLData1 = [];
  var StartingChipsCount = 0;
  var StartingMoney = 0;
  var EndingMoney = 0;
  var EndingChipsCount = 0;
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  var dataprovider = null;

  // function calculateTransactionData() {
  //   positiveBal = positiveBal.sort(function (a, b) {
  //     return b.money - a.money;
  //   });

  //   negativeBal = negativeBal.sort(function (a, b) {
  //     return b.money - a.money;
  //   });
  //   /* need to work on logic */
  //   var i = 0,
  //     j = 0;
  //   while (i < positiveBal.length || j < negativeBal.length) {
  //     if (negativeBal[j].money < positiveBal[i].money) {
  //       data1.push({
  //         from: negativeBal[j].name,
  //         to: positiveBal[i].name,
  //         Amount: negativeBal[j].money,
  //       });
  //       positiveBal[i].money -= negativeBal[j].money;
  //       j++;
  //     } else if (negativeBal[j].money == positiveBal[i].money) {
  //       data1.push({
  //         from: negativeBal[j].name,
  //         to: positiveBal[i].name,
  //         Amount: positiveBal[i].money,
  //       });
  //       positiveBal[i].money -= negativeBal[j].money;
  //       i++;
  //       j++;
  //     } else {
  //       data1.push({
  //         from: negativeBal[j].name,
  //         to: positiveBal[i].name,
  //         Amount: positiveBal[i].money,
  //       });
  //       negativeBal[j].money = negativeBal[j].money - positiveBal[i].money;
  //       i++;
  //     }
  //   }
  // }
  const calculateData1 = () => {
    dataprovider = new DataProvider(
      props.ItemDetails,
      context.oneBuyInToChips,
      context.oneBuyInToDollers,
      context.oneChipCost
    );
    dataprovider.calculateData();
    if (validateData()) {
      props.ItemDetails.map((Item) => {
        var StartingChips = Item.startingBuyIn * context.oneBuyInToChips;
        var Money = Item.startingBuyIn * context.oneBuyInToDollers;
        var onechipscost = context.oneChipCost;
        var profitorloss = Math.abs(Money - Item.endingBid * onechipscost);
        if (StartingChips > Item.endingBid) {
          profitorloss = "-" + profitorloss;
        }
        XLData.push({
          row: Item.row,
          name: Item.name,
          buyins: Item.startingBuyIn,
          money: Money,
          startingChips: StartingChips,
          endingChips: Item.endingBid,
          profitloss: profitorloss,
        });
      });
    } else {
    }
  };

  const saveToDB = async () => {
    if (
      validateData() &&
      dataprovider.GetStartingChipsCount() == dataprovider.GetEndingChpisCount()
    ) {
      const data = await fetch("http://localhost:3000/food/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          text: { groupId: context.groupId, XLData },
        }),
      })
        .then(() => {
          toast("Data Save successfully");
        })
        .catch((Error) => {
          toast("Error occured, unable to save data");
        });
    } else {
      toast("Chips count doesn't match, please check data");
    }
  };

  const exportToCSV = async () => {
    if (validateData()) {
      const date = new Date();

      let currentDay = String(date.getDate()).padStart(2, "0");

      let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

      let currentYear = date.getFullYear();

      // props.ItemDetails.map((Item) => {
      //   var StartingChips = Item.startingBuyIn * context.oneBuyInToChips;
      //   var Money = Item.startingBuyIn * context.oneBuyInToDollers;
      //   var onechipscost = context.oneChipCost;
      //   var profitorloss = Math.abs(Money - Item.endingBid * onechipscost);
      //   if (StartingChips > Item.endingBid) {
      //     profitorloss = "-" + profitorloss;
      //   }
      //   XLData.push({
      //     row: Item.row,
      //     name: Item.name,
      //     buyins: Item.startingBuyIn,
      //     money: Money,
      //     startingChips: StartingChips,
      //     endingChips: Item.endingBid,
      //     profitloss: profitorloss,
      //   });
      // });

      var dataprovider = new DataProvider(
        props.ItemDetails,
        context.oneBuyInToChips,
        context.oneBuyInToDollers,
        context.oneChipCost
      );
      dataprovider.calculateData();
      if (
        dataprovider.GetStartingChipsCount() ==
        dataprovider.GetEndingChpisCount()
      ) {
        dataprovider.calculateAdjustmentData();
        data1 = dataprovider.GetAdjustedData();
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        var fileName = "pokergame+ " + currentDate;
        const ws = XLSX.utils.json_to_sheet(XLData);
        const ws2 = XLSX.utils.json_to_sheet(data1);
        // const wb = { Sheets: { data: ws }, SheetNames: ["data","data2"] };
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "ProfitLossData");
        XLSX.utils.book_append_sheet(wb, ws2, "MoneySplitData");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
      } else {
        toast("Chips count doesnt match, check data");
      }
    } else {
      toast("Please add atleast two users");
    }
  };

  function validateData() {
    if (props.ItemDetails.length > 1) {
      return true;
    }
    return false;
  }

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

  React.useEffect(() => setOpen(props.openDialog), calculateData1(), [
    props.openDialog,
  ]);

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
          {!buttonClick ? (
            <Data1 ItemDetails={props.ItemDetails} />
          ) : (
            <Data2 ItemDetails={props.ItemDetails} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={saveToDB}>
            <SaveIcon />
            Save
          </Button>
          {isDownlaodVisible && (
            <Button onClick={exportToCSV}>
              <FileDownloadOutlinedIcon /> Download
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
