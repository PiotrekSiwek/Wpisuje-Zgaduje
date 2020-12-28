import React, {useState, useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {LoginContext} from "../../../../contexts/LoginContext";

import "./Game.scss";

let score = 1;
let hintCost = 0;

const AnswerBox = ({answer, plName, nextPictures}) => {

    const {addPoints, hintAsideChange, handleLogin, userID, points, resetPoints} = useContext(LoginContext);

    const [bannerRoll, setBannerRoll] = useState(0);
    const [showBannerRoll, setShowBannerRoll] = useState(true);

    const [inputText, setInputText] = useState("");
    const [inputBlocker, setInputBlocker] = useState(false);
    const [inputLocalizationMessage, setInputLocalizationMessage] = useState(true)

    const [hint, setHint] = useState(false);
    const [hintLetter, setHintLetter] = useState(Math.floor(Math.random()*plName.length))
    const [boxColorChange, setBoxColorChange] = useState("");

    const [showButtonLogOut, setShowButtonLogOut ] = useState(false)


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
        setBoxColorChange("");
        setHintLetter(Math.floor(Math.random()*plName.length));
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

    const handleBannerExit = () => {
        setShowBannerRoll(false);
    }

    const savePoints = () => {
        firebase.firestore().collection("Players").doc(`${userID}`)
            .update({
                points: points,
                docNumber: userID
            })
            .catch(error => console.log(error));
    }

    const handleLogOut = () => {
        firebase.auth().signOut()
            .then(() => {
                handleLogin("login");
                savePoints();
            })
            .catch(e => console.log(e.message))
    }

    useEffect(() => {
        const loginStatus = firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                setShowButtonLogOut(true);
            } else {
                setShowButtonLogOut(false);
                resetPoints();
            }
        })
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
            loginStatus();
        }
    }, [])


    return (
        <>   {showBannerRoll ?
            <div className="game__answers__banner" onClick={handleBannerExit}>
                <h2 className="intro__banner" style={{height: `${bannerRoll}px`}}>Zgaduj co jest na obrazkach i wpisuj
                    we wskazane pole </h2>
                <h3 className="intro__banner" style={{height: `${bannerRoll}px`}}> fioletowe kwadraciki pokazują ile
                    liter ma szukane słowo i weryfikują odpowiedź</h3>
            </div>
            :
            <div>
                <div className={"game__answers"}>
                    {answer.map((elm, index) => {
                        return (
                                <div
                                    className={inputText[index] === elm ? "game__answers__boxes-correct" : `game__answers__boxes ${boxColorChange}`}
                                    key={index}>{inputText[index]}

                                    <span
                                        className={index === hintLetter && hint ? "game__answers__hint-show" : "game__answers__hint"}>{elm}</span>
                                </div>
                        )
                    })}
                </div>

                <div className={"game__answers__type-wrap"}>
                    <input className="game__answers__type-in"
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
                    <button className="game__operation__buttons" onClick={handleClickNext}>Dalej</button>
                    <button className="game__operation__buttons"
                            disabled={inputBlocker}
                            onClick={handleClickHelp}>{!hint ? "Podpowiedz" : "Ukryj"}</button>

                    {showButtonLogOut &&
                    <button className="game__operation__buttons"
                            onClick={handleLogOut}>Wyloguj</button>}

                    <Link className="game__operation__buttons" to="/">Powrot </Link>
                </div>
            </div>
        }
        </>
    )
}

export default AnswerBox