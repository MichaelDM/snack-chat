import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import { userProfile, signIn, signOut } from '../../actions/authActions';

class App extends Component {

  get signIn() {
    this.props.dispatch(userProfile());
    this.props.dispatch(signIn());
  }

  get signOut() {
    this.props.dispatch(signOut());
  }

  render() {
    const { auth } = this.props;
    console.log('auth is ', auth);
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
          <li>{auth.profile.wc}</li>
          <li>{auth.profile.hg}</li>
          <li><img src={auth.profile.Ph}/></li>
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
