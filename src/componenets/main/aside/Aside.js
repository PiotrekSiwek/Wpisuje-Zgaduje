import React, {useContext, useState} from 'react';
import {LoginContext} from "../../../contexts/LoginContext";
import "./aside.scss"

const Aside = () => {

    const {points, hintFee} = useContext(LoginContext);

    const [showGameRules, setShowGameRules] = useState(false)

    const handleClickInfo =() =>{
        setShowGameRules(prevState=> !prevState
        )
    }

    return (
        <aside className="aside">
            <div className="aside__box">
                    <span className="aside__text">Moje punkty</span>
                    <span><i className="fas fa-trophy"/></span>
                    <span className="aside__points">{points}</span>
                    <span className={hintFee}> <i className="fas fa-life-ring"/></span>
                    <span className="aside__info" onClick={handleClickInfo}><i className="fas fa-info"/>
                        {showGameRules &&
                        <div className="aside__info__box">
                            <span>Zasady Gry</span>
                            <span>Odgadniecie: 1 pkt</span>
                            <span>Podpowiedz: -0,5 pkt</span>
                        </div>
                        }
                    </span>
            </div>

        </aside>
    )
}
export default Aside