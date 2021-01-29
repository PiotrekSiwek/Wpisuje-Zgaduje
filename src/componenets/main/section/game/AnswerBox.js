import React, {useState, useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import log from "loglevel";

import {LoginContext} from "../../../../contexts/LoginContext";

import "./answerBox.scss";

let score = 2;
let hintCost = 0;

const AnswerBox = ({answer, plName, nextPictures}) => {
    const {
        addPoints,
        hintAsideChange,
        handleLogin,
        userID,
        points,
        resetPoints,
        trophyAnimChange
    } = useContext(LoginContext);

    const [bannerRoll, setBannerRoll] = useState(0);
    const [showBannerRoll, setShowBannerRoll] = useState(true);
    const [inputText, setInputText] = useState("");
    const [inputBlocker, setInputBlocker] = useState(false);
    const [inputLocalizationMessage, setInputLocalizationMessage] = useState(true);
    const [hint, setHint] = useState(false);
    const [hintLetter, setHintLetter] = useState(Math.floor(Math.random() * answer.length));
    const [boxColorChange, setBoxColorChange] = useState("");
    const [showButtonLogOut, setShowButtonLogOut] = useState(false);

    const handleChangeInput = (e) => {
        setInputText(e.target.value.toUpperCase());
        if (e.target.value.toUpperCase() === plName.toUpperCase()) {
            addPoints(score - hintCost);
            setInputBlocker(true);
            setInputLocalizationMessage(false);
            trophyAnimChange(true);
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
        setBoxColorChange("");
        trophyAnimChange(false);
    }
    const handleClickHelp = () => {
        setHintLetter(Math.floor(Math.random() * answer.length));
        setHint(prevState => !prevState);
        if (hintCost === 0) {
            hintCost += 1
        }
        hintAsideChange("aside-points-fee")
    }
    const handleClickInput = () => {
        setBoxColorChange("blank")
    }
    const handleBannerExit = () => {
        setShowBannerRoll(false);
    }
    const handleKeyDownInput = () => {
        setHint(false)
    }
    const handleLogOut = () => {
        firebase.auth().signOut()
            .then(() => {
                handleLogin("login");
                savePoints();
                trophyAnimChange(false);
                hintAsideChange("");
            })
            .catch(e => log.error(e.message));
        resetPoints();
    }

    const savePoints = () => {
        firebase.firestore().collection("Players")
            .doc(`${userID}`)
            .update({
                points: points,
                docNumber: userID
            })
            .catch(message => log.error(message));
    }

    useEffect(() => {
        const loginStatus = firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                setShowButtonLogOut(true);
            } else {
                setShowButtonLogOut(false);
            }
        })
        return () => loginStatus();
    }, []);

    useEffect(() => {
        const time = setTimeout(() => {
            const banner = setInterval(() => {
                setBannerRoll(prevState => {
                    if (prevState === 100) {
                        clearInterval(banner)
                    } else return prevState + 1
                });
            }, 10)
        }, 1000);
        const bannerTime = setTimeout(() => {
            setShowBannerRoll(false)
        }, 10000)
        return () => {
            clearTimeout(time);
            clearTimeout(bannerTime);
        }
    }, [])

    return (
        <>
            {showBannerRoll ?
                <div className="game-banner"
                     onClick={handleBannerExit}>
                    <h2 className="banner" style={{height: `${bannerRoll}px`}}>Zgaduj co jest na obrazkach i wpisuj
                        we wskazane pole
                    </h2>
                    <h3 className="banner" style={{height: `${bannerRoll}px`}}> fioletowe kwadraciki pokazuja ile
                        liter ma szukane słowo i weryfikuja odpowiedz
                    </h3>
                </div>
                :
                <div>
                    <div className={"answers-board"}>
                        {answer.map((elm, index) => {
                            return (
                                <div
                                    className={inputText[index] === elm ?
                                        "answers-board__boxes-correct" :`answers-board__boxes ${boxColorChange}`}
                                    key={index}>{inputText[index]}
                                    <span
                                        className={index === hintLetter && hint ?
                                            "answers-board__hint-show":"answers-board__hint"}>{elm}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    <div className={"answers-input"}>
                        <input className="answers-input__type"
                               disabled={inputBlocker}
                               type={"text"}
                               value={inputText}
                               onClick={handleClickInput}
                               onChange={handleChangeInput}
                               onKeyDown={handleKeyDownInput}/>
                        {inputLocalizationMessage &&
                        <span className="answers-input__info">
                        <i className="fas fa-arrow-left"/>tutaj wpisz odpowiedz
                        </span>
                        }
                        {inputBlocker &&
                        <span className="answers-input__win">punkty zdobyte! klinij dalej! </span>
                        }
                    </div>
                    <div className="operating-box">
                        <button className="operating-box__buttons"
                                onClick={handleClickNext}>Dalej
                        </button>
                        <button className="operating-box__buttons"
                                disabled={inputBlocker}
                                onClick={handleClickHelp}>
                                {hint ? "Ukryj" : "Podpowiedz"}
                        </button>
                        {showButtonLogOut &&
                        <button className="operating-box__buttons"
                                onClick={handleLogOut}>Wyloguj
                        </button>
                        }
                        <Link className="operating-box__buttons" to="/">Powrot </Link>
                    </div>
                </div>
            }
        </>
    )
}

export default AnswerBox;