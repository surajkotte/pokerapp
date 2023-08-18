import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import chips from "../Images/game.png";
import "../styles/userdata.css";
import { useEffect, useState } from "react";
import { InputNumber } from "antd";
import AuthContext from "../auth-context";
import { useContext } from "react";
const UserData = (props) => {
  const context = useContext(AuthContext);
  var oneBuyInToChips = context.oneBuyInToChips;
  var buyInchips = props.startingBuyIn;
  var Chips = buyInchips * oneBuyInToChips;
  const [buyInc, setBuyInc] = useState(buyInchips);
  const [chips, Setchips] = useState(Chips);
  const [endingBid, setEndingBid] = useState();

  function deleteData() {
    props.deleteUserdata(props.row);
  }
  function updateEndingBid(e) {
    setEndingBid(e.target.value);
    props.updatingEndingBuyIn(props.row, e.target.value);
  }
  const onBuyInChange = (e) => {
    buyInchips = e;
    props.updateBuyInVal(props.row, buyInchips);
    setBuyInc(buyInchips);
    Setchips(buyInchips * oneBuyInToChips);
  };
  useEffect(() => {
    setBuyInc(props.startingBuyIn);
    Setchips(props.startingBuyIn * oneBuyInToChips);
  }, [props]);
  return (
    <>
      <div className="boxview">
        <span>{props.row}</span>
        {/* <span>{props.name}</span> */}
        <input
          disabled
          type="text"
          style={{
            borderStyle: "none",
            outline: "none",
            fontSize: "15px",
            color: "black",
            background: "white",
            marginLeft: "5px",
          }}
          value={props.name}
        />
        <InputNumber
          type="number"
          // style={{
          //   width: "8%",
          //   height: "41px",
          //   border: "#9d26b0",
          //   borderStyle: "revert",
          //   borderWidth: "2px",
          //   borderRadius: "4px",
          // }}
          min={1}
          max={999}
          value={buyInc}
          style={{ marginRight: "5px" }}
          onChange={onBuyInChange}
        />
        <TextField
          label="Chips"
          size="small"
          color="secondary"
          style={{ marginRight: "5px" }}
          value={buyInc * oneBuyInToChips}
          focused
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Ending Chips"
          color="secondary"
          focused
          size="small"
          value={endingBid}
          onChange={updateEndingBid}
        />
        <IconButton aria-label="delete">
          <DeleteIcon onClick={deleteData} />
        </IconButton>
      </div>
      <Divider style={{ width: "87%", margin: "auto" }} />
    </>
  );
};

export default UserData;
