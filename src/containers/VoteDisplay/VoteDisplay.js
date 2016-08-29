import React, { Component } from 'react';
import { connect } from 'react-redux';

class VoteDisplay extends Component {
  render() {
    return(
      <div>
        {this.props.winner}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let hashMap = {};
  for (let snack of state.votes.data) {
    hashMap[snack]===undefined ? hashMap[snack] = 1 : hashMap[snack] += 1;
  }
  let winner = [], highestNumberOfVotes = 0;
  for (let item in hashMap) {
    if(hashMap[item] > highestNumberOfVotes){
      highestNumberOfVotes = hashMap[item];
      winner = [item];
    } else if (hashMap[item] === highestNumberOfVotes){
      winner.push(item);
    }
  }
  winner = winner.join(' ');

  return { winner };
}

export default connect(mapStateToProps, {})(VoteDisplay);
