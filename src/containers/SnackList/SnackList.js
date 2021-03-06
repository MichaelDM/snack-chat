import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snack from '../../components/SnackItem/SnackItem';
import VoteDisplay from '../VoteDisplay/VoteDisplay';
import RemainingVotes from '../../components/RemainingVotes/RemainingVotes';
import CreateSnack from '../../components/CreateSnack/CreateSnack';
import { snackVote, fetchVotes } from '../../actions/voteActions';
import { deleteSnack, fetchSnacks, addSnack } from '../../actions/snackActions';
import { updateVoteCountUserProfile } from '../../actions/authActions';


class Snacks extends Component {

  componentWillMount() {
    this.props.dispatch(fetchSnacks());
    this.props.dispatch(fetchVotes());
  }

  handleVote = snack => {
    this.props.dispatch(snackVote(snack));
    this.props.dispatch(updateVoteCountUserProfile());
  }

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
          auth={this.props.auth}
        />
      );
    });
  }

  render() {
    return(
      <div>
        <CreateSnack
          auth={this.props.auth.logedIn}
          addSnack={addSnack}/>
        <ul>
          {this.displaySnack()}
        </ul>
        <VoteDisplay />
        <br/>
        <RemainingVotes
          auth={this.props.auth}/>
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
    auth: state.auth,
   };
}

export default connect(mapStateToProps)(Snacks);
