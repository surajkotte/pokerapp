import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "../styles/inputBox.css";
import Button from "@mui/material/Button";
import DisplayTable from "./DisplayTable";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import userEvent from "@testing-library/user-event";

const InputBox = () => {
  var namefound = false;
  const [name, Setname] = useState("");
  const [startingBuyIn, SetstartingBuyIn] = useState("");
  const [useData, SetUserData] = useState([]);

  function updateStartingBuyIn(row, val) {
    const newData1 = useData.filter((item) => {
      if (item.row == row) {
        item.startingBuyIn = val;
      }
      return item;
    });
    SetUserData(newData1);
  }

  function deleteTableData() {
    SetUserData([]);
  }

  function UpdateEndingBid(row, value) {
    const newData1 = useData.filter((item) => {
      if (item.row == row) {
        item.endingBid = value;
      }
      return item;
    });
    SetUserData(newData1);
  }

  function setName(e) {
    Setname(e.target.value);
  }
  function deleteData(id) {
    const newData = useData.filter((item) => {
      return item.row != id;
    });
    var rowVal = 1;
    newData.map((item) => {
      item.row = rowVal;
      rowVal++;
    });
    SetUserData(newData);
  }
  function setBid(e) {
    SetstartingBuyIn(e.target.value);
  }
  function isValidated(e) {
    if (e === "") {
      toast("Please Enter Name");
    } else {
      useData.map((Item) => {
        if (Item.name == name) {
          namefound = true;
          toast.warn("An Entry Exist with same name", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
      return !namefound;
    }
    return false;
  }
  function AddDataToState(e) {
    if (isValidated(name)) {
      SetUserData([
        ...useData,
        {
          row: useData.length + 1,
          name,
          startingBuyIn: startingBuyIn == "" ? 1 : startingBuyIn,
          endingBid: 0,
          objId: "fvsfvsdfv",
        },
      ]);
      Setname("");
      SetstartingBuyIn("");
    }
  }

  useEffect(() => {}, [useData]);
  return (
    <>
      <div className="input-class">
        <TextField
          size="small"
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={setName}
          value={name}
        />
        <span> </span>
        <TextField
          size="small"
          id="outlined-basic"
          label="Buy-Ins"
          variant="outlined"
          onChange={setBid}
          value={startingBuyIn}
        />
        <span> </span>
        <Button
          className="mui-btn"
          variant="contained"
          onClick={AddDataToState}
        >
          Add
        </Button>
      </div>
      <div style={{ height: "2rem" }}></div>
      <DisplayTable
        userDetaials={useData}
        deleteData={deleteData}
        updateStartingBuyIn={updateStartingBuyIn}
        UpdateEndingBid={UpdateEndingBid}
        deleteAll={deleteTableData}
      />
    </>
  );
};

export default InputBox;
