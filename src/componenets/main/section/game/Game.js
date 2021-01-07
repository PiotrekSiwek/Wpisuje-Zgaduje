import React, {useEffect, useState} from 'react';

import RandomPictures from "./RandomPictures";
import AnswerBox from "./AnswerBox";

import {apiKey, apiURL} from "./data/apiData";
import {wordData} from "./data/wordsData";

import "./Game.scss";


const Game = () => {

    const nameDraw = Math.floor(Math.random() * wordData.length);
    const firstName = wordData[nameDraw];

    const [searchName, setSearchName] = useState(firstName);

    const [pictures, setPictures] = useState([]);
    const [answer, setAnswer] = useState([...searchName.polName.toUpperCase()]);


    useEffect(() => {
        fetch(`${apiURL}/search?query=${searchName.engName}&per_page=3&orientation=landscape`, {
            method: "GET",
            headers: {
                "Authorization": apiKey,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // console.log(response);
                return response.json()
            })
            .then(data => {
                // console.log(data);
                setPictures([...data.photos])
            })

    }, [searchName]);


    const handleClick = () => {
        let randomNumber = Math.floor(Math.random() * wordData.length)
        let name = wordData[randomNumber];
        setSearchName(name);
        setAnswer([...name.polName.toUpperCase()]);
    }

    return(
        <>
        <RandomPictures pictures={pictures}/>
        <AnswerBox answer={answer} plName={searchName.polName} nextPictures={handleClick}/>
        </>
    )
}
export default Game