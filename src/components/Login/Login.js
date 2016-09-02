import React, { Component } from 'react';

class Login extends Component {

  componentWillMount() {
    gapi.load('auth2', () => gapi.auth2.init({
      fetch_basic_profile: true,
      client_id : '936573034960-f2brv39g69pch47ad70fjtph5a3ph26u.apps.googleusercontent.com',
    }));
  }

  render(){
    const { signIn } = this.props;

    return(
      <div>
        <div className="g-signin2"
        onClick={() => signIn()}></div>
      </div>
    );
  }
}

export default Login;
