import { useContext } from 'react';
import { AuthContext } from '@context/auth';

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;