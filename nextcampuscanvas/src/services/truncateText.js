//Text shortener function
export const truncateText = (text, maxLength) => {
  let shortenedText;
  if (text.length > maxLength) {
    shortenedText = text.substr(0, maxLength) + '...';
  } else {
    shortenedText = text;
  }
  return shortenedText;
};
