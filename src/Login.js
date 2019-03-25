import React from 'react';
import { auth } from './firebase';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState(null);

  const signIn = React.useCallback(() => {
    auth.signInWithEmailAndPassword(email, password).catch(setError);
  }, [email, password]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        signIn();
      }}
    >
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button>Sign In</button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default Login;
