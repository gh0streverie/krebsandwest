import React from "react";
import Router from './Components/SiteRouter';
import "./App.css";

const App = () => {

    return (
        <div className="App_container">
            <Router />
        </div>
    );
}

export default React.memo(App);