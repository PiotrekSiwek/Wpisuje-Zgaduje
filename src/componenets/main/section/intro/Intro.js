import React, {useState, useContext, useEffect} from 'react';
import {Link} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import {firebaseConfig} from "../../../../services/firebase.js";
import {LoginContext} from "../../../../contexts/LoginContext";

import "./intro.scss";


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
let docID = "";
let userID = "";


const Intro = () => {

    const {handleLogin, addPoints, points, resetPoints, userName, userDocID} = useContext(LoginContext);


    const [changeLoginLogoutButton, setChangeLoginLogoutButton] = useState(false);
    const [showHideForm, setShowHideForm] = useState(false)
    const [changeLoginToRegistryForm, setChangeLoginToRegistryForm] =useState(true);
    const [signUpError, setSignUpError] = useState(false);
    const [signInError, setSignInError] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

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

    const handleSignIn = () => {
        const mail = form.email;
        const password = form.password;
        const promise = auth.signInWithEmailAndPassword(mail, password);
        promise
            .then(user => {
                // console.log(user);
                userID = user.user.uid;
                setSignInError(false);
                db.collection("Players")
                    .get()
                    .then(data => {
                        // console.log(data);
                        const players = [];
                        data.forEach(record => {
                            const store = record.data()
                            players.push(store)
                        })
                        // console.log(players);
                        const userData = players.filter(elm => elm.userId === userID);
                        // console.log(userData)
                        docID = userData[0].docNumber;
                        userDocID(docID);
                        handleLogin(userData[0].name)
                        addPoints(userData[0].points);
                    })
                    .catch(error => console.log(error))
            })
            .catch(e => {
                console.log(e.message);
                setSignInError(true);
            });
    }

    const handleSignUp = () => {
        if(form.name.length < 3){
            return setSignUpError(true)
        }
        const mail = form.email;
        const password = form.password;
        const promise = auth.createUserWithEmailAndPassword(mail, password);
        promise
            .then(user => {
                // console.log(user.user.uid);
                userID = user.user.uid;
                setSignUpError(false)
                db.collection("Players")
                    .add({
                        userId: user.user.uid,
                        email: form.email,
                        name: form.name,
                        points: 0
                    }).then(data => {
                    // console.log(data.id);
                    docID = data.id;
                    userDocID(docID);
                    // console.log(docID);
                    handleLogin(form.name);
                })
                    .catch(error => console.log(error))
            })
            .catch(e => {
                console.log(e.message);
                setSignUpError(true);
            });
    }

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                handleLogin("login");
                savePoints()
            })
            .catch(e => console.log(e.message));
    }


    const savePoints = () => {
        db.collection("Players").doc(`${docID}`)
            .update({
                points: points,
                docNumber: docID
            })
            .catch(error => console.log(error));
        resetPoints();
    }


    const handleShowLoginForm = () =>{
        setShowHideForm(prevState=>!prevState)
    }

    const handleShowRegistryForm = () =>{
        setChangeLoginToRegistryForm(prevState => !prevState);
        setSignInError(false);
        setSignUpError(false)
    }

    useEffect(() => {
        const loginStatus = auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                // console.log(firebaseUser);
                setChangeLoginLogoutButton(true);
                setTimeout(()=>{
                    setShowWelcomeMessage(true)
                }, 800)
                setForm({
                    name: "",
                    email: "",
                    password: ""
                });

            } else {
                // console.log("nie zalogowany");
                setChangeLoginLogoutButton(false);
                setForm({
                    name: "",
                    email: "",
                    password: ""
                })
                setShowWelcomeMessage(false)
            }
        });
        return () => {
            loginStatus();
        }
    }, [])


    useEffect(()=>{
        const time = setTimeout(()=>{
            const banner = setInterval(() => {
                    setBannerRoll(prevState => {
                       if (prevState === 100) {
                           clearInterval(banner)
                       } else return  prevState +1
                    });
            }, 10)
        },1000);
        return()=> clearTimeout(time)
    },[])


    return (
        <>
            <h1 className="intro__title">ZGADUJE & WPISUJE</h1>

            <div className="intro__box__main-buttons">
                <button className="btn__login" onClick={handleShowLoginForm}>Logowanie</button>
                <Link to="/gra" className="link__game">Gra</Link>
            </div>


            {showHideForm &&
            <div className="intro__form">
                <button className="form__btn" onClick={handleShowRegistryForm}>{changeLoginToRegistryForm? "Rejestracja" : "Logowanie"}</button>
                {showWelcomeMessage && <div className="form__welcome-message"><span >Hej {userName},kliknij "Gra" </span></div>}

                <form className="form" onSubmit={(e => e.preventDefault())}>
                    {!changeLoginToRegistryForm? <>
                    <input placeholder="Imie..." type="text" name="name" value={form.name} onChange={handleInput}/>
                    <span className="form__validation">{signUpError && "Imię musi zawierać minimum 3 znaki"}</span>
                    </>
                    : null}
                    <input placeholder="Email..." type="email" name="email" value={form.email} onChange={handleInput}/>
                    <span className="form__validation">{signUpError && "Email musi zawierać @ i poprawną domenę"} {signInError&&"błędny login lub hasło"}</span>
                    <input placeholder="Hasło..." type="password" name="password" value={form.password} onChange={handleInput}/>
                    <div className="form__validation">{signUpError && "Hasło musi zawierać minimum 6 znaków"} {signInError&&"błędny login lub hasło"}</div>

                    {changeLoginToRegistryForm?<span>
                    {changeLoginLogoutButton?
                        <button className="form__btn sign-btn" onClick={handleSignOut}>Wyloguj</button> :
                        <button className="form__btn sign-btn" onClick={handleSignIn}>Zaloguj</button>}</span> :

                    <button className="form__btn sign-btn" onClick={handleSignUp}>Zarejestruj</button>}
                </form>

            </div>}
            {!showHideForm&&<>
            <h2 className="intro__banner" style={{height:`${bannerRoll}px`}}> Witaj w grze !!! </h2>
            <h3 className="intro__banner" style={{height:`${bannerRoll}px`}}>Zaloguj sie i kliknij graj by rozpoczac</h3>
                </>}
        </>
    )
}

export default Intro