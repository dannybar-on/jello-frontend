import React from 'react';
import { Link } from 'react-router-dom';

import jello from '../assets/img/jello.svg';
import board from '../assets/img/board.jpg';
import { Hero } from '../cmps/Hero.jsx';

export class HomePage extends React.Component {
  render() {
    return (
      <section className="home-page">

        <header className="flex space-between">
          <div className="flex align-center">
            <img className='jello wobble-top-on-hover' src={jello} />
            <h1 className='logo '>Jello</h1>
          </div>
          <nav className="flex align-center">
            <button>Login</button>
            <button>Sign-up</button>
          </nav>

        </header>

        <Hero />
        <div className="product home-layout">
          <h2 className="product-title">It’s more than work. It’s a way of working together.</h2>
          <p>
            Start with a Jello board, lists, and cards.
            Customize and expand with more features as your teamwork grows.
            Manage projects, organize tasks,
            and build team spirit—all in one place.
          </p>
          <Link className="start-doing-btn clean-link" to="/board/" >Start Doing →</Link>
          <img className="board-img" src={board} alt="" />
        </div>
      </section>
    );
  }
}
