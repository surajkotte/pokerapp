import { useEffect, useState } from "react";
import Data2Content from "./Data2Content";
import Item from "antd/es/list/Item";
var message = [
  "Please Add more users",
  "Starting Chips count And Ending Chips count doesnt match",
  "Starting and Ending money of all players matched",
];
const Data2 = (props) => {
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
    props.ItemDetails.map((Item) => {
      var StartingChips = Item.startingBuyIn * 50;
      StartingChipsCount += StartingChips;
      EndingChipsCount += parseInt(Item.endingBid);
      var Money = Item.startingBuyIn * 25;
      StartingMoney += Money;
      var onechipscost = 0.5;
      var profitorloss = Math.abs(Money - Item.endingBid * 0.5);
      EndingMoney += profitorloss;
      if (StartingChips > Item.endingBid) {
        profitorloss = "-" + profitorloss;
      }
      if (profitorloss < 0) {
        negativeBal.push({
          name: Item.name,
          money: Math.abs(profitorloss),
        });
      } else {
        positiveBal.push({
          name: Item.name,
          money: Math.abs(profitorloss),
        });
      }
    });
    /*-------------------------------*/

    if (StartingChipsCount == EndingChipsCount) {
      calculateData();
    } else {
      setMessageIndex(1);
      setDataPresent(false);
    }
  }

  function calculateData() {
    positiveBal = positiveBal.sort(function (a, b) {
      return b.money - a.money;
    });

    negativeBal = negativeBal.sort(function (a, b) {
      return b.money - a.money;
    });
    /* need to work on logic */
    var i = 0,
      j = 0;
    if (positiveBal.length > 0 && negativeBal.length > 0) {
      indexmessage3 = true;
      while (i < positiveBal.length || j < negativeBal.length) {
        if (negativeBal[j].money < positiveBal[i].money) {
          data1.push({
            name1: negativeBal[j].name,
            name2: positiveBal[i].name,
            money: negativeBal[j].money,
          });
          positiveBal[i].money -= negativeBal[j].money;
          j++;
        } else if (negativeBal[j].money == positiveBal[i].money) {
          data1.push({
            name1: negativeBal[j].name,
            name2: positiveBal[i].name,
            money: positiveBal[i].money,
          });
          positiveBal[i].money -= negativeBal[j].money;
          i++;
          j++;
        } else {
          data1.push({
            name1: negativeBal[j].name,
            name2: positiveBal[i].name,
            money: positiveBal[i].money,
          });
          negativeBal[j].money = negativeBal[j].money - positiveBal[i].money;
          i++;
        }
      }
    }else{
      indexmessage3 = false;
    }
  }

  useEffect(() => {
    if(!indexmessage3){
      setMessageIndex(3);
    }
    if (props.ItemDetails.length > 1) {
      setDataPresent(true);
    } else {
      setMessageIndex(0);
      setDataPresent(false);
    }
  }, [props,indexmessage3]);
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
