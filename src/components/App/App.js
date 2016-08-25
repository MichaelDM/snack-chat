import React, { Component } from 'react';

// import style from './App.css';
// <div style = {styles.container} />

export default class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
