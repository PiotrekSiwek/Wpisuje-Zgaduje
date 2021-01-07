import React from 'react';

import "./Game.scss";


const RandomPictures = ({pictures}) => {

    return (
        pictures.length === 0 ?
            <div className="game__pictures">
                <div className="game__pictures__frame frame-color-change"><div className="game__pictures__loading"/></div>
                <div className="game__pictures__frame frame-color-change"><div className="game__pictures__loading"/></div>
                <div className="game__pictures__frame frame-color-change"><div className="game__pictures__loading"/></div>
            </div>
            :
            <div className="game__pictures">
                {pictures.map((elm, index) => {
                    return (
                        <div key={index} className="game__pictures__frame">
                            <img className="game__pictures__photos"
                                 src={elm.src.tiny}
                                 alt=""
                            />
                        </div>
                    )
                })
                }
            </div>
    )
}

export default RandomPictures