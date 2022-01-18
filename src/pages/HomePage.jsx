import React from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {
  render() {
    return (
      <section>
        <h1>Elevate your Task Management to the sky</h1>
        <Link to="/board">Try Demo Version</Link>
      </section>
    );
  }
}
