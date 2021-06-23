import { useContext } from 'react';
import { StudentAuthContext } from '@context/Student/auth';

function useStudentAuth() {
  return useContext(StudentAuthContext);
}

export default useStudentAuth;
