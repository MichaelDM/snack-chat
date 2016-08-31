import React, { Component } from 'react';
import { connect } from 'react-redux';

class RemainingVotes extends Component {

  render() {
    if (!this.props.auth.profile.vote_count) {
      return <div></div>;
    } else {
      return (
        <div>
        Number of votes left: {this.props.auth.profile.vote_count}
        </div>
      );
    }
  }
}

export default connect()(RemainingVotes);
