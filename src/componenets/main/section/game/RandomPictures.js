import React from 'react';

import "./randomPictures.scss";

const RandomPictures = ({pictures}) => {
    return (
            !pictures.length ?
            <div className="game-pictures">
                <div className="pictures frame-color-change">
                    <div className="pictures__loading"/>
                </div>
                <div className="pictures frame-color-change">
                    <div className="pictures__loading"/>
                </div>
                <div className="pictures frame-color-change">
                    <div className="pictures__loading"/>
                </div>
            </div>
            :
            <div className="game-pictures">
                {pictures.map(({src:{tiny}}, index) => {
                    return (
                        <div key={index} className="pictures">
                            <img className="pictures__photos"
                                 src={tiny}
                                 alt="mix"
                            />
                        </div>
                    )
                })
                }
            </div>
    )
}

export default RandomPictures;