import { useContext } from 'react';
import { ClassContext } from '../../context/Class';

function useClass() {
  return useContext(ClassContext);
}

export default useClass;
