import React, { Component } from 'react';

class Snack extends Component {

  get voteCount() {
    return this.props.votes === undefined ? 0 : this.props.votes;
  }

  voteForSnackHelper(snack, auth, voteForSnack){
    if(auth.logedIn){
      return (
        <button onClick={() => voteForSnack(snack)}>
        vote
        </button>
      );
    }
  }

  deleteSnackHelper(snack, auth, deleteSnack) {
    if (auth.logedIn) {
      return (
        <button onClick={() => deleteSnack(snack)}>
        delete snack
        </button>
      );
    }
  }

  render() {
    const { snack, voteForSnack, deleteSnack, auth } = this.props;
    return (
      <li key={snack}>
        <span>{snack}</span>
        {this.voteForSnackHelper(snack, auth, voteForSnack)}
        <span style={{marginLeft: "5px", marginRight: "5px"}}>{this.voteCount}</span>
        {this.deleteSnackHelper(snack, auth, deleteSnack)}
      </li>
    );
  }
}

export default Snack;
