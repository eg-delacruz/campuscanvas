import { useState } from 'react';

export const useCharacterCount = () => {
  const [value, setValue] = useState(0);
  const onChange = (e) => setValue(e.target.value.length);

  return { value, onChange };
};
