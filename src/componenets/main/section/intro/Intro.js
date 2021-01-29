import React, {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";
import {LoginContext} from "../../../../contexts/LoginContext";
import firebase from "firebase/app";
import {firebaseConfig} from "../../../../services/firebase.js";
import "firebase/auth";
import "firebase/firestore";
import log from "loglevel";

import Form from "./Form";

import "./intro.scss";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
let docID = "";
let userID = "";

const Intro = () => {

    const {
        handleLogin,
        addPoints,
        points,
        resetPoints,
        userDocID,
        hintAsideChange,
        trophyAnimChange
    } = useContext(LoginContext);

    const history = useHistory();
    const [changeLoginLogoutButton, setChangeLoginLogoutButton] = useState(false);
    const [showHideForm, setShowHideForm] = useState(false);
    const [changeLoginToRegistryForm, setChangeLoginToRegistryForm] = useState(true);
    const [signUpError, setSignUpError] = useState(false);
    const [signInError, setSignInError] = useState(false);
    const [bannerRoll, setBannerRoll] = useState(0);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleInput = e => {
        const {name, value} = e.target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const handleShowLoginForm = () => {
        setShowHideForm(prevState => !prevState);
    }
    const handleShowRegistryForm = () => {
        setChangeLoginToRegistryForm(prevState => !prevState);
        setSignInError(false);
        setSignUpError(false);
    }
    const handleSignIn = () => {
        const mail = form.email;
        const password = form.password;
        const promise = auth.signInWithEmailAndPassword(mail, password);
        promise
            .then(user => {
                userID = user.user.uid;
                setSignInError(false);
                db.collection("Players")
                    .get()
                    .then(data => {
                        const players = [];
                        data.forEach(record => {
                            const store = record.data();
                            players.push(store)
                        });
                        const userData = players.filter(elm => elm.userId === userID);
                        docID = userData[0].docNumber;
                        userDocID(docID);
                        handleLogin(userData[0].name);
                        addPoints(userData[0].points);
                        trophyAnimChange(false);
                        hintAsideChange("");
                        redirectToGame();
                    })
                    .catch(message => log.error(message));
            })
            .catch(e => {
                log.error(e.message);
                setSignInError(true);
            });
    }
    const handleSignUp = () => {
        if (form.name.length < 3) {
            return setSignUpError(true)
        }
        const mail = form.email;
        const password = form.password;
        const promise = auth.createUserWithEmailAndPassword(mail, password);
        promise
            .then(user => {
                userID = user.user.uid;
                setSignUpError(false);
                db.collection("Players")
                    .add({
                        userId: user.user.uid,
                        email: form.email,
                        name: form.name,
                        points: 0
                    })
                    .then(data => {
                        docID = data.id;
                        userDocID(docID);
                        handleLogin(form.name);
                        trophyAnimChange(false);
                        hintAsideChange("");
                        redirectToGame();
                    })
                    .catch(message => log.error(message));
            })
            .catch(e => {
                log.error(e.message);
                setSignUpError(true);
            });
    }
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                handleLogin("login");
                savePoints();
                trophyAnimChange(false);
                hintAsideChange("");
            })
            .catch(e => log.error(e.message));
    }

    const savePoints = () => {
        db.collection("Players")
            .doc(`${docID}`)
            .update({
                points: points,
                docNumber: docID
            })
            .catch(message => log.error(message));
        resetPoints();
    }
    const redirectToGame = () => {
        history.push("/gra");
    }

    useEffect(() => {
        const loginStatus = auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                setChangeLoginLogoutButton(true);
                setForm({
                    name: "",
                    email: "",
                    password: ""
                });
            } else {
                setChangeLoginLogoutButton(false);
                setForm({
                    name: "",
                    email: "",
                    password: ""
                })
            }
        });
        return () => {
            loginStatus()
        }
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
        return () => clearTimeout(time)
    }, []);

    return (
        <>
            <h1 className="intro-title">ZGADUJE & WPISUJE</h1>
            <div className="intro-buttons">
                <button className="intro-buttons__login"
                        onClick={handleShowLoginForm}>Logowanie
                </button>
                <Link to="/gra" className="intro-buttons__game">Gra</Link>
            </div>
            {showHideForm &&
            <Form handleSignUp={handleSignUp}
                  handleSignIn={handleSignIn}
                  handleSignOut={handleSignOut}
                  handleInput={(e) => handleInput(e)}
                  signInError={signInError}
                  signUpError={signUpError}
                  changeLoginLogoutButton={changeLoginLogoutButton}
                  form={form}
                  changeLoginToRegistryForm={changeLoginToRegistryForm}
                  handleShowRegistryForm={handleShowRegistryForm}
            />
            }
            {!showHideForm &&
            <>
                <h2 className="banner"
                    style={{height: `${bannerRoll}px`}}> Witaj w grze !!!
                </h2>
                <h3 className="banner"
                    style={{height: `${bannerRoll}px`}}>Zaloguj sie i kliknij graj by rozpoczac
                </h3>
            </>
            }
        </>
    )
}

export default Intro;