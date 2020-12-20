import React from 'react';

import "./Game.scss";


const RandomPictures = ({pictures}) => {

    return (
        <div className="game__pictures">
            {pictures.map((elm, index) => {
                return (
                    <div key={index} className="game__pictures__frame">
                        <img className="game__pictures__photos"
                             src={elm.src.tiny}
                             alt=""
                                width="224"
                        height="160"/>
                    </div>
                )
            })
            }
        </div>
    )
}

export default RandomPictures