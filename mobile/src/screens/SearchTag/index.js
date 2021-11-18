import React, { useState } from 'react';

// Components
import ChipInput from '@components/ChipInput';
import Container from '@components/Container';
import { SafeArea, StyledButton } from './style';

const SearchTag = () => {
  const [chips, setChips] = useState([]);

  return (
    <Container>
      <SafeArea>
        <ChipInput
          placeholder="Adicionar tags"
          chips={chips}
          setChips={setChips}
        />
        <StyledButton variant="primary" onPress={() => console.log(chips)}>
          Pesquisar
        </StyledButton>
      </SafeArea>
    </Container>
  );
};

export default SearchTag;
