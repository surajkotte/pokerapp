// const Data1 = () => {
//   return (
//     <>
//     <div>
//       <input
//         type="text"
//         style={{
//           borderStyle: "none",
//           outline: "none",
//           fontSize: "15px",
//           textAlign:'center'
//         }}
//         value="Ramana Kotte"
//       />
//       <input
//         type="text"
//         style={{
//           borderStyle: "none",
//           outline: "none",
//           fontSize: "15px",
//           textAlign:'center'
//         }}
//         value="1000"
//       />
//       <input
//         type="text"
//         style={{
//           borderStyle: "none",
//           outline: "none",
//           fontSize: "15px",
//           textAlign:'center'
//         }}
//         value="1000"
//       />
//       <input
//         type="text"
//         style={{
//           borderStyle: "none",
//           outline: "none",
//           fontSize: "15px",
//           textAlign:'center'
//         }}
//         value="1000"
//       />
//       <input
//         type="text"
//         style={{
//           borderStyle: "none",
//           outline: "none",
//           fontSize: "15px",
//           textAlign:'center'
//         }}
//         value="1000"
//       />
//       <input
//         type="text"
//         style={{
//           borderStyle: "none",
//           outline: "none",
//           fontSize: "15px",
//           textAlign:'center'
//         }}
//         value="1000"
//       />
//       </div>
//     </>
//   );
// };

// export default Data1;

import { Table } from "antd";
import { useContext } from "react";
import AuthContext from "../auth-context";

const columns = [
  {
    title: "Name",
    width: 5,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Buy-Ins",
    width: 5,
    dataIndex: "buyins",
    key: "age",
  },
  {
    title: "Money",
    dataIndex: "money",
    key: "1",
    width: 10,
  },
  {
    title: "Chips",
    dataIndex: "startingChips",
    key: "2",
    width: 10,
  },
  {
    title: "Ending Chips",
    dataIndex: "endingChips",
    key: "3",
    width: 10,
  },
  {
    title: "Profit & Loss",
    dataIndex: "profitloss",
    key: "4",
    width: 10,
  },
];

const Data1 = (props) => {
  const context = useContext(AuthContext);
  const data = [];
  props.ItemDetails.map((Item) => {
    var StartingChips = Item.startingBuyIn * context.oneBuyInToChips;
    var Money = Item.startingBuyIn * context.oneBuyInToDollers;
    var onechipscost = context.oneChipCost;
    var profitorloss = Math.abs(Money - Item.endingBid * onechipscost);
    if (StartingChips > Item.endingBid) {
      profitorloss = "-" + profitorloss;
    }
    data.push({
      key: Item.row,
      name: Item.name,
      buyins: Item.startingBuyIn,
      money: Money,
      startingChips: StartingChips,
      endingChips: Item.endingBid,
      profitloss: profitorloss,
    });
  });
  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        x: 1500,
        y: 500,
      }}
    />
  );
};
export default Data1;
