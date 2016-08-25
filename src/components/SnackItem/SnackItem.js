import React, { Component } from 'react';

class Snack extends Component {

  get voteCount() {
    return this.props.votes === undefined ? 0 : this.props.votes;
  }

  render() {
    const { snack, voteForSnack, deleteSnack } = this.props;
    return (
      <li key={snack}>
        <span>{snack}</span>
        <button onClick={() => voteForSnack(snack)}>
          vote
        </button>
        <span>{this.voteCount}</span>
        <button onClick={() => deleteSnack(snack)}>
          delete snack
        </button>
      </li>
    );
  }
}

export default Snack;
