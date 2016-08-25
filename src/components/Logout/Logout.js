import React, { Component } from 'react';

class Logout extends Component {

  render(){
    const { signIn, signOut } = this.props;

    return(
      <div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
}

export default Logout;
