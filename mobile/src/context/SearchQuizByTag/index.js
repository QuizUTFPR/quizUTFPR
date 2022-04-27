import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// API
import api from '@api';

export const SearchQuizByTagContext = createContext();

const SearchQuizByTag = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [tags, setTags] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [messageError, setMessageError] = useState(false);

  // eslint-disable-next-line consistent-return
  const getQuizByTags = async (remainingTag = '') => {
    const hasTagsInContext = tags.length > 0 || remainingTag.trim().length > 0;

    if (hasTagsInContext) {
      try {
        const queryTags =
          remainingTag.trim().length > 0 ? [...tags, remainingTag] : tags;

        const { data } = await api.post('/quiz/quizzesByTags', {
          aimedTags: queryTags,
        });

        setQuizzes(data);
        setMessageError(false);

        return false;
      } catch (error) {
        setQuizzes([]);

        setMessageError(error.response.data.response);

        return true;
      }
    } else {
      setQuizzes([]);
      return true;
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
        messageError,
        setMessageError,
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
