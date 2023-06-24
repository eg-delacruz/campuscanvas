import DOMPurify from 'isomorphic-dompurify';

// This function is used to create an HTML element from a string. Is is used in the dangerouslySetInnerHTML prop of the Text component:
{
  /* <p
    dangerouslySetInnerHTML={createHTMLElement(HTMLString)}
    ></p> */
}

export const createHTMLElement = (string) => {
  return { __html: DOMPurify.sanitize(string) };
};
