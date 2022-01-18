import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';



class _AppHeader extends React.Component {

    state = {

    }

    componentDidMount() {


    }


    render() {

        return (
            <header className="app-header ">

                <div className="app-header-container ">
                <NavLink to="/">Barak's Hub</NavLink>
                    <nav className="header-nav flex">
                    <NavLink to="/app"><div>apps</div></NavLink>
                    <NavLink to="/"><div>Home</div></NavLink>
                    </nav>


                </div>
            </header>
        )
    }
}

function mapStateToProps({ }) {
    return {

    }
}

const mapDispatchToProps = {

};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)


