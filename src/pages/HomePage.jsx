import React from 'react';

import { Hero } from '../cmps/Hero.jsx';
import { Loader } from '../cmps/Loader'

export class HomePage extends React.Component {
  render() {
    return (
      <section className='home-page'>
        <Hero />
      <Loader/>
       

      </section>
    );
  }
}
