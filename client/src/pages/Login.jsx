import { useState } from "react";
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';

import { ADD_USER } from "../utils/mutations";
import * as Auth from '../utils/auth';
import "../styles/Pages.css"

import Nav from "../components/Nav";


function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: ''});
  const [login, {error}] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(JSON.stringify(formState))
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="logUpContain container my-1">
      <div className="splashText">
        <h1>Welcome to Petstagram!</h1>
        <h2>The place to share your pet photos with other pet lovers</h2>
      </div>

      <div className="logForm">

      <div className="logIn">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
        <label htmlFor="email">Email:</label>
          <input
            placeholder="Email"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="password">Password:</label>
          <input 
            placeholder="********"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>

            <p className="error-text">Incorrect Credentials</p>

          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
}

export default Login;