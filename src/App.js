import logo from "./logo.svg";
import "./App.css";
import MenuBar from "./components/Menubar.js";
import InputBox from "./components/inputBox";
import DisplayTable from "./components/DisplayTable";

function App() {
  return (
    <>
      <MenuBar />
      <div className="App">
        <InputBox />
      </div>
    </>
  );
}

export default App;
