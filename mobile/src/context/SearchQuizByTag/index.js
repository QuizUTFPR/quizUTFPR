import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// API
import api from '@api';

export const SearchQuizByTagContext = createContext();

const SearchQuizByTag = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [tags, setTags] = useState([]);

  const getQuizByTags = async () => {
    try {
      const { data } = await api.post('/quiz/quizzesByTags', {
        aimedTags: tags,
      });
      setQuizzes(data);

      return false;
    } catch (err) {
      setQuizzes([]);
      console.log('error', err);

      return true;
    }
  };

  return (
    <SearchQuizByTagContext.Provider
      value={{
        getQuizByTags,
        quizzes,
        setTags,
        tags,
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
