import React, {useContext} from 'react';
import {LoginContext} from "../../../contexts/LoginContext";
import "./aside.scss"

const Aside = () => {

    const {points, hintFee} = useContext(LoginContext)

    return (
        <aside className="aside">
            <div className="aside__box">
                    <span className="aside__text">Moje punkty</span>
                    <span><i className="fas fa-trophy"/></span>
                    <span className="aside__points">{points}</span>
                    <span className={hintFee}> <i className="fas fa-life-ring"/></span>
            </div>

        </aside>
    )
}
export default Aside