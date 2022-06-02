//To use this service, it is important to create a div element with an ID
//in the component that uses it, so that the script can be inserted
//in that div. Also, it needs to be executed inside a useEffect hook

export const InsertScript = async (scriptSource, scriptID, HTMLelementID) => {
  if (typeof window !== 'undefined') {
    const Element = document.getElementById(HTMLelementID);
    const script = document.createElement('script');
    script.setAttribute('id', scriptID);
    script.src = await scriptSource;
    script.async = true;
    script.type = 'text/javascript';
    Element.appendChild(script);
  }
};
