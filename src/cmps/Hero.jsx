import React from "react";
import { Link } from 'react-router-dom';
import hero from '../assets/img/hero.png';

export function Hero() {



    return (

        <React.Fragment>
            <div className="hero-container flex align-center home-layout">
                <div className="hero-text flex column" >
                    <h1 className="hero-title">Jello helps teams move work forward.</h1>

                    <p>Collaborate, manage projects, and reach new productivity
                        peaks. From high rises to the home office,
                        the way your team works is unique 
                        accomplish it all with Jello.</p>
                        <Link className="get-started-btn clean-link" to="/board/" >Get started !</Link>
                </div>
                <img src={hero}></img>

            </div>
        </React.Fragment>

    );


}