import React, { useState, useRef } from 'react';

import {
  StyledInput,
  Wrapper,
  Chip,
  TextChip,
  RemoveIcon,
  RemoveButton,
  ChipWrapper,
} from './style';

const ChipInput = ({ chips, setChips, placeholder }) => {
  const [value, setValue] = useState();
  const ref = useRef();

  const handleAddChip = () => {
    if (!value.trim()) return;

    const newChips = [...chips, value].filter(Boolean);

    if (newChips.length > 0) {
      setChips([
        ...new Set(newChips.map((element) => element.toLowerCase().trim())),
      ]);
      setValue('');
    }
  };

  const removeChip = (idx) => () => {
    setChips((prevChips) => prevChips.filter((_, index) => index !== idx));
  };

  const removeLastWhenPressBackSpace = () => {
    if (chips.length > 0) {
      removeChip(chips.length - 1)();
    }
  };

  return (
    <Wrapper>
      {chips.length > 0 && (
        <ChipWrapper
          ref={ref}
          onContentSizeChange={() => {
            ref.current.scrollToEnd({ animated: true });
          }}
        >
          {chips.map((item, idx) => (
            <Chip key={(item, idx)}>
              <TextChip>{item}</TextChip>
              <RemoveButton onPress={removeChip(idx)}>
                <RemoveIcon />
              </RemoveButton>
            </Chip>
          ))}
        </ChipWrapper>
      )}
      <StyledInput
        value={value}
        onSubmitEditing={handleAddChip}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit={false}
        onKeyPress={({ nativeEvent }) => {
          if (value === '' && nativeEvent.key === 'Backspace') {
            removeLastWhenPressBackSpace();
          }
        }}
      />
    </Wrapper>
  );
};

export default ChipInput;
