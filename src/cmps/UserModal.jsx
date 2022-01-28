import React from 'react';
import { connect } from 'react-redux';
import {Link,} from 'react-router-dom'
import { UserAvatar } from './UserAvatar.jsx';

import { logout } from '../store/user.action.js';
export class _UserModal extends React.Component {

    state = {
        isLogin: false
    };

    render() {
        const { user, logout } = this.props;
        const url = (window.location.href.indexOf('board') === -1) ? 'board/login' : 'login'
            
        return (


            <section className="user-modal-content">
                {user && <div className="log-out-modal">
                    <div className="user-info flex align-center">
                       <span><UserAvatar fullname={user.fullname} url={null} /></span> 
                       <div className="flex column">
                       <span className="user-username">{user.username}</span>
                       <div className="user-fullname">{user.fullname}</div>

                       </div>
                    </div>
                    <hr></hr>
                    <div>
                        <span className="user-logout-btn" onClick={() => logout()}>Log out</span>
                    </div>
                </div>
                // :
                // <div className="log-in-modal">
                //     <div className="flex align-center">
                //         <UserAvatar fullname={'Guest'}  />
                //         <h4>Hello Guest!</h4>
                //     </div>
                //     <hr></hr>
                //     <div>
                //     {/* <span onClick={() => logout()}>Log out</span> */}
                //         <Link to={url}>Log in</Link>
                //     </div>
                // </div>
                
                }
            </section>
        );
    }
}

function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    };
}

const mapDispatchToProps = {
    logout,
};

export const UserModal = connect(mapStateToProps, mapDispatchToProps)(_UserModal);