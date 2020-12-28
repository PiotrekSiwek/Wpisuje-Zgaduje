import React, {useEffect} from "react";
import firebase from "firebase/app";
import "firebase/auth";

import Footer from "./componenets/footer/Footer";
import Header from "./componenets/header/Header";
import Main from "./componenets/main/Main";
import LoginProvider from "./contexts/LoginContext";


import "./app.scss";


const App = () => {

    useEffect(()=>{
        firebase.auth().signOut().catch(message => console.log(message))
    },[])

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

