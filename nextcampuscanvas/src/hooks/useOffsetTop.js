//offsetTop is the distance from the top of the page to the top of the element
import { useState, useEffect } from 'react';

export default function useOffsetTop(ref) {
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetTop(ref.current.offsetTop);
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [offsetTop]);
  return [offsetTop];
}
