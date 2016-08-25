import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSnack } from '../../actions/snackActions';

class CreateSnack extends Component {

  constructor(){
    super();
    this.state = { new_snack: ''}
  }

  handleInput = e => {
    this.setState({ [e.target.name] : e.target.value });
  }

  render(){
    return(
      <div>
        <input type='text'
          placeholder='new snack'
          name='new_snack'
          value={this.state.new_snack}
          onChange={this.handleInput}/>
        <button type='button'
          onClick={() => this.props.addSnack(this.state.new_snack)}>
          Submit New Snack
        </button>
      </div>
    )
  }
}

export default connect(null, { addSnack })(CreateSnack);
