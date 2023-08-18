import { useRef, useState } from "react";

import "../styles/Menubar.css";
import pokerimage from "../Images/poker-cards.png";

const Menubar = () => {
  const navRef = useRef();
  const [view, SetView] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <div>
        <img src={pokerimage} />
        <h3> Texas Poker</h3>
      </div>
      <nav ref={navRef}>
        <a href="/#">Home</a>
        <a href="/#">More</a>
        <a href="/#">{view ? "Table View" : "Board view"}</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}></button>
      </nav>
    </header>
  );
};

export default Menubar;
