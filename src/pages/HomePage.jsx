import React from 'react';
import { Link } from 'react-router-dom';

import jello from '../assets/img/jello.svg';
import board from '../assets/img/board.jpg';
import { Hero } from '../cmps/Hero.jsx';

import { Loader } from '../cmps/Loader';

export class HomePage extends React.Component {
  state = {
    isPageScrolled: false,
  };

  componentDidMount() {
    const ElHomePage = document.querySelector('.home-page');
    ElHomePage.addEventListener('scroll', this.changeHeaderStyle);
    ElHomePage.style.overflowY = 'scroll';
  }

  componentWillUnmount() {
    const ElHomePage = document.querySelector('.home-page');
    ElHomePage.removeEventListener('scroll', this.changeHeaderStyle);
    ElHomePage.style.overflowY = 'hidden';
  }

  changeHeaderStyle = () => {
    const ElHomePage = document.querySelector('.home-page');

    const { isPageScrolled } = this.state;
    if (ElHomePage.scrollTop > 50 && !isPageScrolled) {
      this.setState({ isPageScrolled: true });
    } else if (ElHomePage.scrollTop < 50 && isPageScrolled) {
      this.setState({ isPageScrolled: false });
    }
  };

  render() {
    const { isPageScrolled } = this.state;

    return (
      <section className="home-page">
        <header className={`home-header ${isPageScrolled ? 'bg-visible' : ''}`}>
          <div className=" logo-container flex align-center">
            <img className="jello wobble-top-on-hover" src={jello} />
            <span className="logo"> Jello</span>
          </div>
          <div className="header-buttons">
            <Link to="board/login">
              <button className="login-btn nav-button">Log in</button>
            </Link>
            <Link to="board/login">
              <button className="signup-btn nav-button">Sign up</button>
            </Link>
          </div>
        </header>
        <Hero />
        <div className="product flex column home-layout">
          <h2 className="product-title">
            It’s more than work. It’s a way of working together.
          </h2>
          <p>
            Start with a Jello board, lists, and cards. Customize and expand
            with more features as your teamwork grows. Manage projects, organize
            tasks, and build team spirit—all in one place.
          </p>
          <Link className="clean-link login-link" to="/board/login">
            Sign up-it's free!
          </Link>
          <img className="board-img" src={board} alt="" />
        </div>
      </section>
    );
  }
}
