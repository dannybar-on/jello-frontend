import jello from '../assets/img/jello.svg';

export function Loader() {
    return (
       
        <div className="loader-container   align-center">

        <img className='jello loader-logo-wobble' src={jello} />

        <span className="logo flex row">  Loading <span className="dot-stretching"></span></span>
      </div>
    )
}