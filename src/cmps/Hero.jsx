import React from "react";
import { Link } from 'react-router-dom';
export function Hero() {



    return (

        <React.Fragment>
            <div className="hero-container">
                <div className="hero-img-container">
                    <div className="hero-title flex column">
                        Elevate your Task Management to the sky
                        <Link className="clean-link" to="/board">Try Demo Version</Link>
                    </div>
                </div>

            </div>
        </React.Fragment>

    );


}