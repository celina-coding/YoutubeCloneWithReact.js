import { useState, useEffect } from 'react';
import { auth } from '../firebase/config'; // Assurez-vous que vous avez un fichier de configuration Firebase

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { user };
}

export default useAuth;
