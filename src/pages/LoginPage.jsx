import React from 'react';
import { connect } from 'react-redux';

import LoginSvgLeft from '../assets/img/login-svg-left.svg'
import LoginSvgRight from '../assets/img/login-svg-right.svg'
import jello from '../assets/img/jello.svg';


class _LoginPage extends React.Component {
    state = {
        username: '',
        fullname: '',
        password: '',
        isLogin: true
    };

    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({ ...prevState, [name]: value }));

    };

    onSubmit = (ev) => {
        ev.preventDefault();
        const { username, password, fullname, isLogin } = this.state;

        if (isLogin) {
            const { onLoadUser } = this.props;
            if (!username && !password) return;
            const credentials = {
                username,
                password,
            };

            onLoadUser(credentials)
                .then(() => {
                    this.props.history.push('/');
                });
        } else {

            const { onSignUp } = this.props;
            if (!username && !password && !fullname) return;

            const userInfo = {
                username,
                password,
                fullname
            };
            onSignUp(userInfo)
                .then(() => this.props.history.push('/'));
        }
    };

    toggleForm = () => {
        let { isLogin } = this.state;
        this.setState({ isLogin: !isLogin });
    };

    render() {
        const { isLogin } = this.state;
        return (

            <section className='login-page'>


                <div className='login-logo-header flex-row-center'>
                    <img className='jello wobble-top-on-hover' src={jello} />
                    <h1 className='login-logo'>Jello</h1>
                </div>

                <div className="login-container ">

                    <h3> {(isLogin) ? `Log in ` : 'Sign-up '} to Jello</h3>
                    <div className='flex column align-center'>

                        {/* {(isLogin) ? `Login ` : 'Sign-up '} */}

                    </div>
                    <form >
                        <div className="inputs-container flex column">
                            {!isLogin &&
                                <input
                                    className="input-style"
                                    name="fullname"

                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    autoFocus
                                    onChange={this.handleChange}

                                />}

                            <input
                                className="input-style"
                                label="User name"
                                name="username"
                                autoComplete="username"
                                onChange={this.handleChange}

                            />

                            <input
                                className="input-style"
                                required

                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                // autoComplete="current-password"
                                onChange={this.handleChange}

                            />
                            <button
                                className="btn-style2"
                                type="submit"

                                onClick={this.onSubmit}
                            >
                                {(isLogin) ? 'Login' : 'Sign-up'}
                            </button>
                        </div>
                    </form>
                    <button className="toggle-login" onClick={() => this.toggleForm()}>
                        {(isLogin) ? `Don\'t have an account? Sign-up` : `Already have
                        an account? Login`}

                    </button>
                </div>

                <div className="right-svg">
                    <img src={LoginSvgRight} alt="LoginSvgRight" />
                </div>
                <div className="left-svg">
                    <img src={LoginSvgLeft} alt="LoginSvgLeft" />
                </div>
            </section>

        );
    }
}



const mapDispatchToProps = {


};



export const LoginPage = connect(null, mapDispatchToProps)(_LoginPage);