import React from 'react';
import Auth from '../../components/AuthForm/AuthForm';
import './Signup.scss';


const Signup = props => {
  return (
    <div className="auth-form">
      <Auth authaction='signup' history={props.history} />
      <br /><br/>
    </div>
  );
}

export default Signup

