import React from 'react';
import {HashRouter, Route} from "react-router-dom";

import Game from "./game/Game";
import Intro from "./intro/Intro";

import "./section.scss";

const Section = () => {
    return (
        <section className="section">
            <HashRouter>
                <Route path="/" exact={true} component={Intro}/>
                <Route path="/gra" component={Game}/>
            </HashRouter>
        </section>
    )
}
export default Section;