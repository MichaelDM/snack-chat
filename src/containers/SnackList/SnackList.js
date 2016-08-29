import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snack from '../../Components/SnackItem/SnackItem';
import VoteDisplay from '../VoteDisplay/VoteDisplay';
import CreateSnack from '../CreateSnack/CreateSnack';
import { snackVote, fetchVotes } from '../../actions/voteAction';
import { deleteSnack, fetchSnacks } from '../../actions/snackActions';

class Snacks extends Component {

  componentWillMount() {
    this.props.dispatch(fetchSnacks());
    this.props.dispatch(fetchVotes());
  }

  handleVote = snack => this.props.dispatch(snackVote(snack))

  handleDelete = snack => this.props.dispatch(deleteSnack(snack))

  displaySnack(){
    return this.props.snackList.map(snack => {
      return (
        <Snack
          key={snack}
          snack={snack}
          votes={this.props.votes[snack]}
          voteForSnack={this.handleVote}
          deleteSnack={this.handleDelete}
        />
      );
    });
  }

  render() {
    return(
      <div>
        <CreateSnack />
        <ul>
          {this.displaySnack()}
        </ul>
        <VoteDisplay />
      </div>
    )
  }
}
function mapStateToProps(state) {
  let hashMap = {};
  for (let snack of state.votes.data){
    hashMap[snack]===undefined ? hashMap[snack] = 1 : hashMap[snack] += 1 ;
  }
  return {
    snackList: state.snackList.data,
    votes: hashMap,
   };
}

export default connect(mapStateToProps)(Snacks);
