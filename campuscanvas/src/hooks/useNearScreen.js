import { useEffect, useState, useRef } from 'react';

//Hook para lazyLoad a imágenes o cualquier objeto

export function useNearScreen() {
  //Permite capturar el elemento del DOM, la cual guardaremos en esta const
  const element = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    Promise.resolve(
      typeof window.IntersectionObserver !== 'undefined'
        ? window.IntersectionObserver
        : import(//Polyfill que hace que el int.obs. cargue si no hay compatibilidad con navegador
          'intersection-observer')
    ).then(() => {
      const observer = new window.IntersectionObserver((entries) => {
        //console.log(entries);
        const { isIntersecting } = entries[0];
        //console.log(isIntersecting);
        if (isIntersecting) {
          //console.log("si");
          setShow(true);
          //optimizamos luego de que ha sido true
          observer.disconnect();
        }
      });
      observer.observe(element.current);
      //console.log(element.current);
    });
  }, [element]);

  //Retorna show para usar ese estado en caso de true/false
  //Retorna element para usarlo en parámetro de ref en el elemento
  //que queremos observar si intersecciona
  return [show, element];
}
