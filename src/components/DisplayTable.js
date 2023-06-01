import "../styles/displayTable.css";
import UserData from "./UserData";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialogSlide from "./DialougBox";
import { useEffect, useState } from "react";
import { isVisible } from "@testing-library/user-event/dist/utils";

const DisplayTable = (props) => {
  var data=[];
  const [IsVisble, SetIsVisible] = useState(false);
  function deleteUserdata(id) {
    props.deleteData(id);
  }
  function clickIsOpen(){
    console.log(" is user");
    console.log(props.userDetaials);

    SetIsVisible(true);


  }
  function clearAllData(){
    props.deleteAll();
  }
  function updateBuyIn(row,buyInval){
    props.updateStartingBuyIn(row,buyInval);
  }

  function updateEndingBuyIn(row,val){
    props.UpdateEndingBid(row,val);
  }
  useEffect(()=>{
    //console.log("onTriggerChange",props.userDetaials);
  },[props.userDetaials])
  return (
    <div style={{ width: "100%" }}>
      <div className="display-div">
        <div style={{ marginTop: "10px" }}></div>
        {props.userDetaials.map((Item) => {
          if (Item.row != "")
            return (
              <UserData
                row={Item.row}
                name={Item.name}
                startingBuyIn={Item.startingBuyIn}
                deleteUserdata={deleteUserdata}
                updateBuyInVal={updateBuyIn}
                updatingEndingBuyIn={updateEndingBuyIn}
              />
            );
        })}
      </div>
      <div style={{ marginTop: "10px" }}></div>
      <Button
        style={{ width: "100px" }}
        color="success"
        className="mui-btn"
        variant="contained"
        onClick={clickIsOpen}
      >
        Calculate
      </Button>
      <span style={{ margin: "15px" }}></span>
      <Button
        style={{ width: "100px" }}
        startIcon={<DeleteIcon />}
        className="mui-btn"
        variant="contained"
        onClick={clearAllData}
      >
        clear
      </Button>
      <AlertDialogSlide ItemDetails={props.userDetaials} openDialog={IsVisble} closeDialog={(visibility)=>SetIsVisible(visibility)}/>
    </div>
  );
};

export default DisplayTable;
