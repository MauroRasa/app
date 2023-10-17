import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';

const KeepKeyboardOpenTextInput = ({ value, onChangeText }) => {
  const [keepKeyboardOpen, setKeepKeyboardOpen] = useState(false);

  useEffect(() => {
    setKeepKeyboardOpen(true);
    return () => setKeepKeyboardOpen(false);
  }, []);

  const handleFocus = () => {
    setKeepKeyboardOpen(true);
  };

  const handleBlur = () => {
    setKeepKeyboardOpen(false);
  };

  return (
    <TextInput
      value={value}
      style={{ width: '50%', borderColor: 'gray', borderWidth: 1, marginBottom: 10, color: 'white' }}
      onChangeText={onChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      keyboardShouldPersist={keepKeyboardOpen}
    />
  );
};

export default KeepKeyboardOpenTextInput;
