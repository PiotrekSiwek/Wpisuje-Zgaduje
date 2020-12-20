import React, {createContext, useState} from "react";


export const LoginContext = createContext("");

const LoginProvider = ({children}) => {

    const [userName, setUserName] = useState("login");
    const [points, setPoint] = useState(0);
    const [hintFee, setHintFee] = useState("")

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

    return (
        <LoginContext.Provider value={{userName, handleLogin, points, addPoints, resetPoints, hintFee, hintAsideChange}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider