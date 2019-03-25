import React from 'react';
import { auth } from './firebase';

export const Session = React.createContext();

export const SessionProvider = props => {
  const [user, setUser] = React.useState(null);
  const [busy, setBusy] = React.useState(true);

  React.useEffect(() => {
    let unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setBusy(false);
    });
    return unsubscribe;
  }, []);

  return <Session.Provider {...props} value={{ user, loading: busy }} />;
};

export const useSession = () => {
  const { user, loading } = React.useContext(Session);
  return [user, loading];
};

export default Session;
