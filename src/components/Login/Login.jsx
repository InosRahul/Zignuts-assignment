import { Listing } from 'components';
import React, { useState } from 'react';
import users from '../../../src/data/users.json';
import './styles.css';
export const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem('loggedIn'),
  );
  const handleInput = event => {
    setState(prevProps => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = event => {
    event.preventDefault();
    const userData = state;
    const data = users.users;
    let checkData = data.filter(
      item =>
        item.email.includes(userData.email) &&
        item.password.includes(userData.password),
    );
    if (checkData.length) {
      localStorage.setItem('email', userData.email);
      localStorage.setItem('password', btoa(userData.password));
      localStorage.setItem('userid', JSON.stringify(checkData[0].user_id));
      localStorage.setItem('loggedIn', true);
    } else {
      alert('check credentials');
    }
    checkData.length ? setLoggedInUser(true) : setLoggedInUser(false);
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <Listing />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={state.email}
              onChange={handleInput}
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleInput}
            />
          </div>
          <div className="form-control">
            <label></label>
            <button type="submit">Login</button>
          </div>
        </form>
      )}
    </div>
  );
};
