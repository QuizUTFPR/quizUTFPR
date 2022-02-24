import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// API
import api from '@api';

export const SearchQuizByTagContext = createContext();

const SearchQuizByTag = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  const getQuizByTags = async (chips) => {
    try {
      const { data } = await api.post('/quiz/quizzesByTags', {
        aimedTags: chips,
      });
      setQuizzes(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SearchQuizByTagContext.Provider
      value={{
        getQuizByTags,
        quizzes,
      }}
    >
      {children}
    </SearchQuizByTagContext.Provider>
  );
};

SearchQuizByTag.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchQuizByTag;
