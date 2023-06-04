import { useEffect, useState } from "react";
import Data2Content from "./Data2Content";
var message = [
  "Please Add more users",
  "Starting Chips count And Ending Chips count doesnt match",
  "Starting Money and Ending Money doesnt match",
];
const Data2 = (props) => {
  const [dataPresent, setDataPresent] = useState(false);
  const [messageIndex,setMessageIndex] = useState(0);
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
  }

  useEffect(() => {
    if (props.ItemDetails.length > 1) {
      setDataPresent(true);
    } else {
      setMessageIndex(0);
      setDataPresent(false);
    }
  }, [props]);
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
          }}
        >
          {message[messageIndex]}
        </h1>
      )}
    </>
  );
};

export default Data2;
