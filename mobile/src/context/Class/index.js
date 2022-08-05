import React, { createContext, useState } from 'react';

export const ClassContext = createContext();

const ClassContextProvider = ({ children }) => {
  const initialValues = {
    id: null,
    teacher: '',
    title: '',
    image: '',
    description: '',
    pin: null,
    amountOfQuizzes: null,
    subscribed: false,
    imageURL: false,
  };

  const [classData, setClassData] = useState(initialValues);

  const handleSetClassData = (values) => setClassData(values);

  return (
    <ClassContext.Provider
      value={{
        classData,
        handleSetClassData,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
