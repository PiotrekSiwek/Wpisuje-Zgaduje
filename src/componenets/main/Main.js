import React from 'react';

import Aside from "./aside/Aside";
import Section from "./section/Section";

import "./main.scss";

const Main = () => {
    return (
        <main className="main">
            <Aside/>
            <Section/>
        </main>
    )
}
export default Main;