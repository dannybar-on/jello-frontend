import React from 'react';
import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';



export class AppHeader extends React.Component {

    state = {

    };

    componentDidMount() {


    }


    render() {

        return (
            <header className="app-header ">

                <div className="app-header-container flex space-between align-center">
                    <NavLink className="clean-link" to="/"><h1>Jello</h1></NavLink>
                    {/* <nav className="header-nav "> */}
                        <ul className='clean-list flex'>
                            <li>
                                <NavLink className="clean-link" to="/"><div>Home</div></NavLink>
                            </li>
                            <li>
                                <NavLink className="clean-link" to="/board"><div>Board List</div></NavLink>
                            </li>
                        </ul>
                    {/* </nav> */}


                </div>
            </header>
        );
    }
}

// function mapStateToProps({ }) {
//     return {

//     }
// }

// const mapDispatchToProps = {

// };

// export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)


