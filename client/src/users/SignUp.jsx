import React, { Component } from 'react';
import { create } from './apiUser.js';
import './SignUp.css';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        password: false
      }
    };
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value })
  }

  handleOnSubmit = e => {
    e.preventDefault();

    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }
    create(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: ''})
      }
    })

  }

  render() {
    return (
      <div className="SignUp">
        <form onSubmit={this.handleOnSubmit}>
          <div>
            <p><strong>Full Name:</strong></p>
            <p>
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleOnChange}
                className={this.state.errors.name ? 'error' : ''}
              />
              {this.state.errors.name && <div className="errorMessage">Required field</div>}
            </p>
          </div>

          <div>
            <p><strong>Email:</strong></p>
            <p>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleOnChange}
                className={this.state.errors.email ? 'error' : ''}
              />
              {this.state.errors.email && <div className="errorMessage">Required field</div>}
            </p>
          </div>

          <div>
            <p><strong>Password:</strong></p>
            <p>
              <input
                name="password"
                type="tel"
                value={this.state.password}
                onChange={this.handleOnChange}
                className={this.state.errors.password ? 'error' : ''}
              />
              {this.state.errors.password && <div className="errorMessage">Required field</div>}
            </p>
          </div>

          <p>
            <button onClick={this.handleOnSubmit}>Submit</button>
          </p>
        </form>
      </div>
    );
  }
}


export default SignUp;
