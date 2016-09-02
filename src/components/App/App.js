import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import { signIn, signOut } from '../../actions/authActions';

class App extends Component {

  get signIn() {
    console.log('hello aps');
    this.props.dispatch(signIn());
  }

  get signOut() {
    this.props.dispatch(signOut());
  }

  render() {
    const { auth } = this.props;
    if (!this.props.auth.logedIn) {
      return (
        <div>
          <br/>
          <br/>
          <Login signIn={() => this.signIn} />
          <br/>
          <br/>
          {this.props.children}
        </div>
      )
    }
    return (
      <div>
        <br/>
        <br/>
        <Login signIn={() => this.signIn} />
        <Logout signOut={() => this.signOut} />
        <ul>
          <li>{auth.profile.fullname}</li>
          <li>{auth.profile.email}</li>
          <li><img src={auth.profile.profile_picture}/></li>
        </ul>
        <br/>
        <br/>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state){
  return ({ auth: state.auth });
}

export default connect(mapStateToProps)(App);
