import React, {useEffect, useState} from 'react';
import RandomPictures from "./RandomPictures";
import AnswerBox from "./AnswerBox";
import {wordData} from "./data/wordsData";

const Game = () => {
    const nameDraw = Math.floor(Math.random() * wordData.length);
    const firstName = wordData[nameDraw];

    const [searchName, setSearchName] = useState(firstName);
    const [pictures, setPictures] = useState([]);
    const [answer, setAnswer] = useState([...searchName.polName.toUpperCase()]);

    const handleClick = () => {
        let randomNumber = Math.floor(Math.random() * wordData.length)
        let name = wordData[randomNumber];
        setPictures([]);
        setSearchName(name);
        setAnswer([...name.polName.toUpperCase()]);
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/search?query=${searchName.engName}&per_page=3&orientation=landscape`, {
            method: "GET",
            headers: {
                "Authorization": `${process.env.REACT_APP_HIDDEN_KEY}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPictures([...data.photos])
            })
    }, [searchName]);

    return (
        <>
            <RandomPictures pictures={pictures}/>
            <AnswerBox answer={answer}
                       plName={searchName.polName}
                       nextPictures={handleClick}/>
        </>
    )
}
export default Game;