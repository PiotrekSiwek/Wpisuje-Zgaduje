import React, {useContext} from 'react';
import {LoginContext} from "../../contexts/LoginContext";

import "./header.scss";

const Header = () => {
    const {userName} = useContext(LoginContext);

    return (
        <header className="header">
            <div className="header__box container">
                <div className="header__text">
                    Ucze sie pisania wyrazow <span>klasa I</span>
                </div>
                <div className="header__logo">
                    <strong>A</strong>
                    <strong>B</strong>
                    <strong>C</strong>
                    <span>...</span>
                    <i className="fas fa-pen"/>
                </div>
                <div className="header__login">
                    Moje imie: <span>{userName}</span>
                </div>
            </div>
        </header>
    )
}

export default Header;