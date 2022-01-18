// import React from 'react';
// import { connect } from 'react-redux';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
// import { onSignUp, onLoadUser } from '../store/user.action';


// class _LoginPage extends React.Component {
//     state = {
//         username: '',
//         fullname: '',
//         password: '',
//         isLogin: true
//     };

//     handleChange = ({ target }) => {
//         const name = target.name;
//         const value = target.value;
//         this.setState(prevState => ({ ...prevState, [name]: value }));

//     };

//     onSubmit = (ev) => {
//         ev.preventDefault();
//         const { username, password, fullname, isLogin } = this.state;

//         if (isLogin) {
//             const { onLoadUser } = this.props;
//             if (!username && !password) return;
//             const credentials = {
//                 username,
//                 password,
//             };

//             onLoadUser(credentials)
//                 .then(() => {
//                     this.props.history.push('/');
//                 });
//         } else {

//             const { onSignUp } = this.props;
//             if (!username && !password && !fullname) return;

//             const userInfo = {
//                 username,
//                 password,
//                 fullname
//             };
//             onSignUp(userInfo)
//                 .then(() => this.props.history.push('/'));
//         }
//     };

//     toggleForm = () => {
//         let { isLogin } = this.state;
//         this.setState({ isLogin: !isLogin });
//     };

//     render() {
//         const { isLogin } = this.state;
//         return (

//             <div className='login-page main-layout flex justify-center'>
//                 <CssBaseline />
//                 <div className="login-container flex direction-col">
//                     <div className='flex direction-col align-center'>
//                         <Avatar className="avatar" />
//                         <Typography component="h1" variant="h5">
//                             {(isLogin) ? `Log-in ` : 'Sign-up '}
//                             <FontAwesomeIcon icon={faSignInAlt} />
//                         </Typography>
//                     </div>
//                     <form >
//                         <div className="inputs-container flex direction-col">
//                             {!isLogin && <TextField
//                                 autoComplete="fname"
//                                 name="fullname"
//                                 variant="outlined"
//                                 // required
//                                 fullWidth
//                                 id="fullName"
//                                 label="Full Name"
//                                 autoFocus
//                                 onChange={this.handleChange}

//                             />}

//                             <TextField
//                                 variant="outlined"
//                                 // required
//                                 fullWidth
//                                 id="username"
//                                 label="User name"
//                                 name="username"
//                                 autoComplete="username"
//                                 onChange={this.handleChange}

//                             />

//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 id="password"
//                                 autoComplete="current-password"
//                                 onChange={this.handleChange}

//                             />
//                             <Button
//                                 className="sign-up-btn"
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 color="secondary"
//                                 onClick={this.onSubmit}
//                             >
//                                 {(isLogin) ? 'Log-in' : 'Sign-up'}
//                             </Button>
//                         </div>
//                     </form>
//                     <button className="toggle-login" onClick={() => this.toggleForm()}>
//                         {(isLogin) ? `Don\'t have an account? Sign-up` : `Already have
//                         an account? Log-in`}

//                     </button>
//                 </div>
//             </div>

//         );
//     }
// }



// const mapDispatchToProps = {
//     // onSignUp,
//     // onLoadUser,

// };



// export const LoginPage = connect(null, mapDispatchToProps)(_LoginPage);