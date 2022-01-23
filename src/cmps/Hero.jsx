import React from "react";
import { Link } from 'react-router-dom';
export function Hero() {



    return (

        <React.Fragment>
            <div className="hero-container">
                <div className="hero-img-container flex column align-center space-around">
                    <div className="hero-title ">
                        Elevate your Task Management to the sky
                    </div>
                        <Link className="clean-link demo-btn btn-style1" to="/board">Try Demo Version</Link>
                </div>

            </div>
        </React.Fragment>

    );


}