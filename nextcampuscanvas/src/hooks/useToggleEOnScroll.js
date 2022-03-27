import { useState, useEffect } from 'react';

//Returns bool depending on the distance we define
export const useToggleOnScroll = (windowDistance) => {
  const [showFixed, setShowFixed] = useState(false);

  useEffect(() => {
    //Función que devuelve bool al hacer scroll
    const onScroll = () => {
      const newShowFixed = window.scrollY > windowDistance;
      showFixed !== newShowFixed && setShowFixed(newShowFixed);
    };

    //Forma de activar onScroll
    document.addEventListener('scroll', onScroll);

    //Clean listener in case component stops rendering (Optimization)
    return () => document.removeEventListener('scroll', onScroll);

    //Retornamos lo necesario para usar el hook
  }, [showFixed, windowDistance]);
  return [showFixed];
};
