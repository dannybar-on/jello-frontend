import React from 'react';
import { NavLink,useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoggedAvatar } from './LoggedAvatar.jsx';
import jello from '../assets/img/jello.svg';
import { logout } from '../store/user.action.js';
import { MdDashboard } from 'react-icons/md';

class _AppHeader extends React.Component {

    state = {

        isModalOpen: false,
    };

    toggleDynamicModal = (ev) => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    };



    render() {
        const { user } = this.props;
        const { isModalOpen } = this.state

        return (
            // <header className="app-header" style={{backgroundColor:'#0079bf'}}>
            <header className="app-header">

                <div className="app-header-container flex space-between align-center">
                    <NavLink className="clean-link" to="/">
                        <div className='flex'>
                            <img className='jello wobble-top-on-hover' src={jello} />
                            <h1 className='logo '>Jello</h1>
                        </div>
                    </NavLink>
                    <ul className='clean-list flex align-center'>

                        <li>
                            <NavLink className="clean-link boards-link" to="/board">
                                <span className="board-list-icon"><MdDashboard /></span>
                                <span>Boards</span>
                            </NavLink>
                        </li>

                        <li>
                            {user ? <LoggedAvatar fullname={user.fullname} toggleDynamicModal={this.toggleDynamicModal} isModalOpen={isModalOpen} /> :
                                <LoggedAvatar fullname={'Guest'} toggleDynamicModal={this.toggleDynamicModal} isModalOpen={isModalOpen} />}
                        </li>

                    </ul>

                </div>
            </header>
        );
    }
}

const item = { title: 'User Modal' }
function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    };
}

const mapDispatchToProps = {
    logout,
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader);


