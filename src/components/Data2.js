import { useEffect, useState, useContext } from "react";
import Data2Content from "./Data2Content";
import Item from "antd/es/list/Item";
import AuthContext from "../auth-context";
import { DataProvider } from "../calculation";
var message = [
  "Please Add more users",
  "Starting Chips count And Ending Chips count doesnt match",
  "Starting and Ending money of all players matched",
];
const Data2 = (props) => {
  const context = useContext(AuthContext);
  const [dataPresent, setDataPresent] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  var indexmessage3 = true;
  var data1 = [];
  var StartingChipsCount = 0;
  var EndingChipsCount = 0;
  var StartingMoney = 0;
  var EndingMoney = 0;
  var positiveBal = [];
  var negativeBal = [];
  if (dataPresent) {
    var dataprovider = new DataProvider(
      props.ItemDetails,
      context.oneBuyInToChips,
      context.oneBuyInToDollers,
      context.oneChipCost
    );
    dataprovider.calculateData();
    if (
      dataprovider.GetStartingChipsCount() == dataprovider.GetEndingChpisCount()
    ) {
      positiveBal = dataprovider.GetPositiveBal();
      negativeBal = dataprovider.GetNegativeBal();
      calculateData();
    } else {
      setMessageIndex(1);
      setDataPresent(false);
    }
  }
  function calculateData() {
    dataprovider.SortPositiveBal();
    dataprovider.SortNegativeBal();
    if (
      dataprovider.GetPositiveBal().length > 0 &&
      dataprovider.GetNegativeBal().length > 0
    ) {
      indexmessage3 = true;
      dataprovider.calculateAdjustmentData();
      data1 = dataprovider.GetAdjustedData();
    } else {
      indexmessage3 = false;
    }
  }

  useEffect(() => {
    if (!indexmessage3) {
      setMessageIndex(3);
    }
    if (props.ItemDetails.length > 1) {
      setDataPresent(true);
    } else {
      setMessageIndex(0);
      setDataPresent(false);
    }
  }, [props, indexmessage3]);
  return (
    <>
      {dataPresent ? (
        <Data2Content data={data1} />
      ) : (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "cursive",
            color: "darkblue",
            height: "100%",
            fontSize: "25px",
          }}
        >
          {message[messageIndex]}
        </h1>
      )}
    </>
  );
};

export default Data2;
