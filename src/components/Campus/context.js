import { createContext, useContext } from 'react';

const CampusListContext = createContext(null);

const useCampusList = () => {
  return useContext(CampusListContext);
}

export { useCampusList };
export default CampusListContext;
