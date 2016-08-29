import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};
  if (!values.new_snack) {
    errors.new_snack = 'This field must not be left blank';
  }
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error }}) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

class CreateSnack extends Component {

  handleFormSubmit = snack => {
    console.log('handeFormSubmit with ', snack);
    return this.props.dispatch(this.props.addSnack(snack.new_snack));
  }

  render(){
    const { handleSubmit, auth } = this.props;
    if (auth) {
      return(
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field name="new_snack"
            type="text"
            component={renderField}
            label="new snack"/>
          <div>
            <button type="submit">Submit New Snack</button>
          </div>
        </form>
      );
    } else {
      return <div>Please log in to vote!</div>;
    }
  }
}

function mapStateToProps(state) {
  console.log('state auth is ', state);
  return { auth: state.auth.logedIn };
}

export default reduxForm({
  form: 'createSnack',
  validate
})(CreateSnack);

{/* <div>
  <input type='text'
  placeholder='new snack'
  name='new_snack'
  value={this.state.new_snack}
  onChange={this.handleInput}/>
  <button type='button'
  onClick={() => this.props.addSnack(this.state.new_snack)}>
  Submit New Snack
  </button>
</div> */}
