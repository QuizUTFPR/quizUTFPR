import React, { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import theme from '@theme';

import api from '@api';

// Components
import Container from '@components/Container';
import CardWithTeacherName from '@components/Card/WithTeacherName';

// STYLES
import { StyledScrollView, ClassContainer } from './style';

const ClassPage = () => {
  const navigation = useNavigation();
  const [classList, setClassList] = useState([]);

  const getClasses = async () => {
    try {
      const { data } = await api.get('/class/studentClasses');
      setClassList(data.length ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getClasses();
    }, [])
  );
  return (
    <Container>
      <StyledScrollView>
        <ClassContainer>
          {classList.map((item) => (
            <CardWithTeacherName
              key={item.id}
              data={item}
              navigate={() =>
                navigation.navigate('ClassStack', {
                  screen: 'InfoOfClass',
                  params: {
                    id: item.id,
                    teacher: item.teacher,
                    title: item.title,
                    image: item?.image?.url,
                    description: item.description,
                    pin: item.pin,
                    subscribed: true,
                  },
                })
              }
              color={theme.color.purple}
            />
          ))}
        </ClassContainer>
      </StyledScrollView>
    </Container>
  );
};

export default ClassPage;
