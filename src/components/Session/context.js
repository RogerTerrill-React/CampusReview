import { createContext, useContext } from 'react';

const AuthUserContext = createContext(null);

const useAuthUser = () => {
  return useContext(AuthUserContext);
}

export { useAuthUser };
export default AuthUserContext;
