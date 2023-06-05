import logo from "./logo.svg";
import "./App.css";
import MenuBar from "./components/Menubar.js";
import InputBox from "./components/inputBox";
import DisplayTable from "./components/DisplayTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <MenuBar />
      <div className="App">
        <InputBox />
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
