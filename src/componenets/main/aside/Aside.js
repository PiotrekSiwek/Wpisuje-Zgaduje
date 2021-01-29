import React, {useContext, useState} from 'react';
import {LoginContext} from "../../../contexts/LoginContext";
import classNames from "classnames";

import "./aside.scss";

const Aside = () => {
    const {points, hintFee, trophyAnim} = useContext(LoginContext);
    const [showGameRules, setShowGameRules] = useState(false);

    const handleClickInfo = () => {
        setShowGameRules(prevState => !prevState)
    }

    const asideButtonClose = classNames("fas fa-info", {
        "btn-change": showGameRules
    });
    const asideButtonShow = classNames("fas fa-times", {
        "btn-change": !showGameRules
    });
    const asideTrophyAnim = classNames("fas fa-trophy", {
        "trophy-anim": trophyAnim
    });

    return (
        <aside className="aside">
            <div className="aside__box">
                <span className="aside__text">Moje punkty</span>
                <i className={asideTrophyAnim}/>
                <span className="aside__points">{points}</span>
                <span className={hintFee}>
                    <i className="fas fa-lightbulb"/>
                </span>
                <button className="aside__btn" onClick={handleClickInfo}>
                    <i className={asideButtonClose}/>
                    <i className={asideButtonShow}/>
                </button>
                <div className="aside__info">
                    {showGameRules &&
                    <div className="manual">
                        <span className="rules">Zasady Gry</span>
                        <span className="score">Odgadniecie: 2 pkt</span>
                        <span className="score">Podpowiedz: -1 pkt</span>
                    </div>
                    }
                </div>
            </div>
        </aside>
    )
}
export default Aside;