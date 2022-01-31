import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { signup, login, logout, googleLogin } from '../store/user.action.js';

import LoginSvgLeft from '../assets/img/login-svg-left.svg';
import LoginSvgRight from '../assets/img/login-svg-right.svg';
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
            const { login } = this.props;
            if (!username && !password) return;
            const credentials = {
                username,
                password,
            };


            login(credentials)
                .then((user) => {
                    if (user) this.props.history.push('/board')

                })



        } else {

            const { signup } = this.props;
            if (!username && !password && !fullname) return;

            const userInfo = {
                username,
                password,
                fullname
            };
            signup(userInfo)
                .then(() => this.props.history.push('/board'));
        }
    };

    toggleForm = () => {
        let { isLogin } = this.state;
        this.setState({ isLogin: !isLogin });
    };


    handleGoogleLogin = (res) => {

        const { tokenId } = res
        const { googleLogin } = this.props
        googleLogin(tokenId)
        this.props.history.push('/board')

    }

    handleGoogleFailure = (res) => {
        console.log('Login with google failed', res)
    }


    responseGoogle = (response) => {
        console.log(response);
    };

    render() {
        const { isLogin } = this.state;
        // console.log(this.state);
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
                                <label> Full name
                                    <input
                                        className="input-style"
                                        name="fullname"
                                        id="fullName"
                                        label="Full Name"
                                        autoFocus
                                        onChange={this.handleChange}

                                    />
                                </label>}

                            <label> User name
                                <input
                                    className="input-style"
                                    label="User name"
                                    name="username"
                                    autoComplete="username"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label> Password
                                <input
                                    className="input-style"
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={this.handleChange}
                                />
                            </label>
                            <button
                                className={`btn-style2 ${(isLogin) ? 'login-btn' : 'signup-btn'}`}
                                type="submit"
                                onClick={this.onSubmit}
                            >
                                {(isLogin) ? 'Login' : 'Sign-up'}
                            </button>
                        </div>
                    </form>
                    <GoogleLogin
                        className="google-login"
                        clientId="1075713010675-m4s5vqqfj2kdl5t43hpfcao569uq0c4o.apps.googleusercontent.com"
                        buttonText="Log-in with Google"
                        onSuccess={this.handleGoogleLogin}
                        onFailure={this.handleGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                    />

                    <hr />

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
    login,
    logout,
    signup,
    googleLogin,

};



export const LoginPage = connect(null, mapDispatchToProps)(_LoginPage);