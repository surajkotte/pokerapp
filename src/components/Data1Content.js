import "../styles/Data1Content.css";
const Data1Content = () => {
  return (
    <>
      <div className="contentCss">
        <input
          type="text"
          style={{
            borderStyle: "none",
            outline: "none",
            fontSize: "15px",
            width: "100px",
          }}
          value="Names"
        />
        <input
          type="text"
          style={{
            borderStyle: "none",
            outline: "none",
            fontSize: "15px",
          }}
          value="Buy-ins"
        />
        <input
          type="text"
          style={{
            borderStyle: "none",
            outline: "none",
            fontSize: "15px",
          }}
          value="Money"
        />
        <input
          type="text"
          style={{
            borderStyle: "none",
            outline: "none",
            fontSize: "15px",
          }}
          value="Chips"
        />
        <input
          type="text"
          style={{
            borderStyle: "none",
            outline: "none",
            fontSize: "15px",
          }}
          value="EndingChips"
        />
        <input
          type="text"
          style={{
            borderStyle: "none",
            outline: "none",
            fontSize: "15px",
            width: "100px",
          }}
          value="Profit/Loss"
        />
      </div>
    </>
  );
};

export default Data1Content;
