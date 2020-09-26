import { createContext, useContext } from 'react';

const MajorsListContext = createContext(null);

const useMajorsList = () => {
  return useContext(MajorsListContext);
}

export { useMajorsList };
export default MajorsListContext;
