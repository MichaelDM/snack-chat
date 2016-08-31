import React, { Component } from 'react';
import { connect } from 'react-redux';

class RemainingVotes extends Component {

  render() {
    if (this.props.auth.profile.vote_count === 0) {
      return (
        <div>
        You have used up all your votes!
        </div>
      );
    } else if (this.props.auth.profile.vote_count) {
      return (
        <div>
        Number of votes left: {this.props.auth.profile.vote_count}
        </div>
      );
    } else {
      return <div></div>
    }
  }
}

export default connect()(RemainingVotes);
