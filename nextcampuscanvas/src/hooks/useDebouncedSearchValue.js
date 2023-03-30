import { useState, useEffect } from 'react';

// Optimal wait time for debounce is 300ms
function useDebouncedSearchValue(value, wait = 300) {
  //State to store the search value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update the inner state after <wait> ms
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    // Clear previous timeout in case a new value is received
    return () => {
      window.clearTimeout(timeoutId);
    };
    //Every time the value changes, we want to reset the timer
  }, [value]);

  return debouncedValue;
}

export default useDebouncedSearchValue;
