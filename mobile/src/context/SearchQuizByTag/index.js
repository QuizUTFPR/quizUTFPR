import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// API
import api from '@api';

export const SearchQuizByTagContext = createContext();

const SearchQuizByTag = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [tags, setTags] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  // eslint-disable-next-line consistent-return
  const getQuizByTags = async () => {
    if (tags.length > 0) {
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
    } else {
      setQuizzes([]);
    }
  };

  const removeTagAndGetNewQuizzes = async (idx) => {
    const oldTags = [...tags];
    oldTags.splice(idx, 1);
    setTags(oldTags);
    setShouldUpdate((prevState) => !prevState);
  };

  useEffect(() => {
    getQuizByTags();
  }, [shouldUpdate]);

  return (
    <SearchQuizByTagContext.Provider
      value={{
        getQuizByTags,
        quizzes,
        setTags,
        tags,
        removeTagAndGetNewQuizzes,
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
