import React from "react";
import Nav from "./Components/Nav";
import "./App.css";

const App = () => {

  return (
    <div className="App_container">
      <Nav />
    </div>
  );
}

export default React.memo(App);