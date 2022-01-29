import React from "react";
import { Link } from 'react-router-dom';
import hero from '../assets/img/hero.png';

export function Hero() {



    return (

        <React.Fragment>
            <div className="hero-container flex align-center home-layout">
                <div >
                    <h1 className="hero-title">Jello helps teams move work forward.</h1>

                    <p>Collaborate, manage projects, and reach new productivity
                        peaks. From high rises to the home office,
                        the way your team works is unique—
                        accomplish it all with Jello.</p>
                    <Link className="clean-link login-link " to="/board/login">Sign up-it's free!</Link>
                </div>
                <img src={hero}></img>
                {/* </div> */}

            </div>
        </React.Fragment>

    );


}