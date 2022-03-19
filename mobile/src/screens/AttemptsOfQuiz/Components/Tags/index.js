import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// THEME
import useSearchQuizByTag from '@hook/useSearchQuizByTag';
import theme from '../../../../styles/theme';

// STYLES
import { TagContainer, TagText, IconButtonWrapper } from './styles';

// HOOKS

const Tags = ({ tags }) => {
  const [ableToSearchQuizByTag, setAbleToSearchQuizByTag] = useState(false);

  const { getQuizByTags, setTags, tags: contextTags } = useSearchQuizByTag();
  const navigation = useNavigation();

  useEffect(() => {
    const fetch = async () => {
      const hasError = await getQuizByTags();

      if (!hasError) {
        navigation.navigate('SearchQuizByTagStack', {
          initial: false,
          screen: 'ResultSearchTag',
        });
      }
    };
    if (ableToSearchQuizByTag) {
      fetch();
    }

    return () => {
      setAbleToSearchQuizByTag(false);
    };
  }, [contextTags]);

  return (
    <>
      {tags.map((tag) => (
        <TagContainer
          key={tag}
          onPress={() => {
            setTags([tag]);
            setAbleToSearchQuizByTag(true);
          }}
        >
          <TagText>{tag}</TagText>
          <IconButtonWrapper>
            <AntDesign name="arrowright" size={24} color={theme.color.purple} />
          </IconButtonWrapper>
        </TagContainer>
      ))}
    </>
  );
};

export default Tags;
