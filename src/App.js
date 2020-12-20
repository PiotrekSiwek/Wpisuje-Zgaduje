import React from "react";

import Footer from "./componenets/footer/Footer";
import Header from "./componenets/header/Header";
import Main from "./componenets/main/Main";
import LoginProvider from "./contexts/LoginContext";

import "./app.scss";


const App = () => {

    return (
        <div className="wrap">
        <LoginProvider>
            <Header/>
            <Main/>
            <Footer/>
        </LoginProvider>
            </div>
    )
}

export default App;

