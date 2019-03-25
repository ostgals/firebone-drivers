import React from 'react';
import { useSession } from './Session';
import Subtree from './Subtree';
import Login from './Login';

const App = () => {
  const [user, busy] = useSession();

  if (busy) {
    return <p>Loading session...</p>;
  }

  if (!user) {
    return <Login />;
  }

  return <Subtree />;
};

export default App;
