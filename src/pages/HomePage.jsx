import React from 'react';

import { Hero } from '../cmps/Hero.jsx';
export class HomePage extends React.Component {
  render() {
    return (
      <section className='home-page'>
        <Hero />
        {/* <img className='hero' src={hero} alt='' /> */}

      </section>
    );
  }
}
