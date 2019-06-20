import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {
        email: false,
        password: false
      }
    };
  }

  handleOnChange = e => {
    const { target: { value, name } } = e;

    this.setState({
      [name]: value
    });
  }

  handleOnSubmit = e => {
    // The e.preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event won't occur.
    e.preventDefault();

    const { email, password } = this.state;

    // If email or password is missing we add an error class
    this.setState({
      errors: {
        email: email === '',
        password: password === ''
      }
    });

    const data = {
      email,
      password
    };

    // Once we have the data collected we can call a Redux Action or process the data as we need it.
    console.log('Data:', data);
  }

  render() {
    return (
      <div className="SignIn">
        <form onSubmit={this.handleOnSubmit}>
          <div>
            <p><strong>First Name:</strong></p>
            <p>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleOnChange}
                className={this.state.errors.email ? 'error' : ''}
              />
              {this.state.errors.email && <div className="errorMessage">Required field</div>}
            </p>
          </div>

          <div>
            <p><strong>Last Name:</strong></p>
            <p>
              <input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleOnChange}
                className={this.state.errors.password ? 'error' : ''}
              />
              {this.state.errors.password && <div className="errorMessage">Required field</div>}
            </p>
          </div>

          <p>
            <button>Save Information</button>
          </p>
        </form>
      </div>
    );
  }
}

export default SignIn;
