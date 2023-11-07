import { useUser } from './UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ userToDisplay }) {
  const { setUser } = useUser();
  const initialValue = {
    username: '',
    password: '',
  };
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [loginForm, setLoginForm] = useState(initialValue);

  function handleLoginChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 400) {
          setLoginError(true);
          console.error('Login failed. Please check your username and password.');
          return Promise.reject('Login failed');
        }
      })
      .then((data) => {
        setUser(data);
        userToDisplay(data);
        navigate('/login');
      })
      .catch((error) => console.error('Error', error));
  }

  const warningStyles = {
    color: 'red',
    marginTop: '-10px',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const loginDiv = (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Username"
          onChange={handleLoginChange}
          name="username"
          value={loginForm.username}
        />
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          onChange={handleLoginChange}
          name="password"
          value={loginForm.password}
        />
        {loginError ? (
          <p style={warningStyles}>
            Login failed. Please check your username and password.
          </p>
        ) : null}
        <button className="login-signup-submit">Login</button>
      </form>
    </div>
  );

  return (
    <div className="login-signup-page">
      {loginDiv}
      <div className="login-signup-toggle" onClick={() => navigate('/login')}>
        Sign Up
      </div>
    </div>
  );
}

export default Login;
