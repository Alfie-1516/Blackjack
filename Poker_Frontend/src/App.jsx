import React, { useEffect, useState } from "react";
import "./App.css";
import HelpWindow from "./pages/helpWindow";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import Table from "./pages/Table";
import Navbar from "./components/Navbar";
import CustomFooter from "./components/CustomFooter";

function App() {
  const path = window.location.pathname;
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <>
      <Navbar setShowHowToPlay={setShowHowToPlay} />
      {path === "/Home" && <Home />}
      {path === "/Rules" && <Rules />}
      {path === "/Table" && <Table />}
      <HelpWindow
        setShowHowToPlay={setShowHowToPlay}
        showHowToPlay={showHowToPlay}
      />
      <CustomFooter />
    </>
  );
}

export default App;
