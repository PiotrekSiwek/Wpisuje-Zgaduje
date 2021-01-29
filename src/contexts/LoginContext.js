import React, {createContext, useState} from "react";

export const LoginContext = createContext("");

const LoginProvider = ({children}) => {

    const [userName, setUserName] = useState("login");
    const [userID, setUserID] = useState("");
    const [points, setPoint] = useState(0);
    const [hintFee, setHintFee] = useState("");
    const [trophyAnim, setTrophyAnim] = useState(false);

    const userDocID = (data) =>{
        setUserID(data)
    }
    const handleLogin = (name) => {
        setUserName(name)
    }
    const addPoints = (score) => {
        setPoint(prevState => prevState + score)
    }
    const resetPoints = () =>{
        setPoint(0)
    }
    const hintAsideChange = (style) =>{
        setHintFee(style)
    }
    const trophyAnimChange = (value) => {
        setTrophyAnim(value);
    }

    return (
        <LoginContext.Provider value={{userName, handleLogin, points, addPoints, resetPoints, hintFee, hintAsideChange, trophyAnim, trophyAnimChange, userID, userDocID}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider