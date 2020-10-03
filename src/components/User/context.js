import { createContext, useContext } from 'react';

const UserListContext = createContext(null);

const useUserList = () => {
  return useContext(UserListContext);
}

export { useUserList };
export default UserListContext;
