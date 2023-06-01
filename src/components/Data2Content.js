import "../styles/Data2.css";
import RightArrow from "../Images/right-arrow.svg";
import { Input } from "antd";
const Data2Content = (props) => {
  return (
    <>
      {props.data.map((Item) => {
        return (
          <div className="Data2Div">
            <Input
              disabled
              style={{ width: "20%", color: "black" }}
              value={Item.name1}
            />
            <img src={RightArrow} style={{ height: "20px" }} />
            <Input
              disabled
              style={{ width: "20%", color: "black" }}
              value={Item.name2}
            />
            <Input
              disabled
              style={{ width: "20%", color: "black" }}
              value={Item.money}
            />
          </div>
        );
      })}
    </>
  );
};

export default Data2Content;
