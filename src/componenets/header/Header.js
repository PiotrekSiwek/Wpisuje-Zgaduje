import React, {useContext} from 'react';
import "./header.scss";
import {LoginContext} from "../../contexts/LoginContext";

const Header = () => {

    const {userName} = useContext(LoginContext)

    return (
        <header className="header">
            <div className="header__box container">
                <div className="header__text">
                    Uczę się pisania wyrazów <span>klasa I</span>
                </div>
                <div className="header__logo">
                    <strong><span>A</span></strong>
                    <strong><span>B</span></strong>
                    <strong><span>C</span></strong>
                    <span>...</span>
                    <i className="fas fa-pen"/>
                </div>
                <div className="header__login">
                    Moje imię: <span>{userName}</span>
                </div>
            </div>
        </header>
    )
}

export default Header