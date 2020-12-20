import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom";

import {LoginContext} from "../../../../contexts/LoginContext";

import "./Game.scss";

let score = 1;
let hintCost = 0;

const AnswerBox = ({answer, plName, nextPictures}) => {

    const {addPoints, hintAsideChange} = useContext(LoginContext);

    const [inputText, setInputText] = useState("");
    const [inputBlocker, setInputBlocker] = useState(false);
    const [inputLocalizationMessage, setInputLocalizationMessage] = useState(true)

    const [hint, setHint] = useState(false);
    const [boxColorChange, setBoxColorChange] = useState("");



    const handleChangeInput = (e) => {
        setInputText(e.target.value.toUpperCase());
        if (e.target.value.toUpperCase() === plName.toUpperCase()) {
            addPoints(score - hintCost);
            setInputBlocker(true)
        }
    }

    const handleClickNext = () => {
        nextPictures();
        setInputLocalizationMessage(false)
        setInputText("");
        setHint(false);
        hintCost = 0;
        setInputBlocker(false);
        hintAsideChange("");
        setBoxColorChange("")
    }

    const handleClickHelp = () => {
        setHint(prevState => !prevState);
        if (hintCost === 0) {
            hintCost += 0.5
        }
        hintAsideChange("aside__points-fee")
    }

    const handleClickInput = () => {
        setBoxColorChange("black")
    }

    return (
        <>
            <div className={"game__answers"}>
                {answer.map((elm, index) => {
                    return (
                        <>
                            <div
                                className={inputText[index] === elm ? "game__answers__boxes-correct" : `game__answers__boxes ${boxColorChange}`}
                                key={index}>{inputText[index]}

                                <span
                                    className={index === 0 && hint ? "game__answers__hint-show" : "game__answers__hint"}>{elm}</span>
                            </div>
                        </>
                    )
                })}
            </div>

            <div className={"game__answers__type-wrap"}>
                <input className="game__answers__type-in"
                    // placeholder="tutaj wpisz odpowiedz..."
                       disabled={inputBlocker}
                       type={"text"}
                       value={inputText}
                       onClick={handleClickInput}
                       onChange={handleChangeInput}/>
                {inputLocalizationMessage &&
                <span className="game__answers__arrow-info"><i
                    className="fas fa-arrow-left"/>tutaj wpisz odpowiedz </span>}
            </div>

            <div className="game__operation__box">
                <button className={"game__operation__buttons"} onClick={handleClickNext}>Dalej</button>
                <button className={"game__operation__buttons"}
                        onClick={handleClickHelp}>{!hint ? "Podpowiedz" : "Ukryj"}</button>
                <button className="game__operation__buttons">Wyloguj</button>
                <Link className="game__operation__buttons" to="/">Powrot</Link>
            </div>
        </>
    )
}

export default AnswerBox