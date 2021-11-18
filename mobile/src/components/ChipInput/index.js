import React, { useState } from 'react';

import {
  StyledInput,
  Wrapper,
  Chip,
  TextChip,
  RemoveIcon,
  RemoveButton,
} from './style';

const ChipInput = ({ chips, setChips, placeholder }) => {
  const [value, setValue] = useState();

  const handleAddChip = () => {
    const newValue = value.trim();

    if (newValue.length > 0) {
      setChips((prevState) => [...prevState, newValue]);
      setValue('');
    }
  };

  const removeChip = (idx) => () => {
    setChips((prevChips) => prevChips.filter((_, index) => index !== idx));
  };

  return (
    <Wrapper>
      {chips.map((item, idx) => (
        <Chip key={(item, idx)}>
          <TextChip>{item}</TextChip>
          <RemoveButton onPress={removeChip(idx)}>
            <RemoveIcon />
          </RemoveButton>
        </Chip>
      ))}
      <StyledInput
        value={value}
        onSubmitEditing={handleAddChip}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit={false}
      />
    </Wrapper>
  );
};

export default ChipInput;
