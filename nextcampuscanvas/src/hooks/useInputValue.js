import { useState } from 'react';

// Hook para manejar/controlar la info de los inputs
export const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);

  return { value, onChange, setValue };
};
