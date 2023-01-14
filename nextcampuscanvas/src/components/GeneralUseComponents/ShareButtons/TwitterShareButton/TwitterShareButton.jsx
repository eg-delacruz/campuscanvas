const TwitterShareButton = ({
  width = 50,
  height = 50,
  color = '#1D9BF0',
  postTitle = '',
  URL = 'https://www.campuscanvas.net/',
}) => {
  //CLARIFICATIONS:
  //1. Pass this in props if we want to share the current page:
  //const currentURL = encodeURI(window.location.href);
  //2. postTitle cannot contain strange symbols like %

  const ShareURL = `https://twitter.com/share?url=${URL}&text=${postTitle}`;

  return (
    <div>
      <a href={ShareURL} target={'_blank'}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={width}
          height={height}
          viewBox='0 0 50 40.609'
        >
          <path
            id='Icon_awesome-twitter'
            data-name='Icon awesome-twitter'
            d='M44.861,13.5c.032.444.032.888.032,1.333,0,13.547-10.311,29.156-29.156,29.156A28.958,28.958,0,0,1,0,39.39a21.2,21.2,0,0,0,2.475.127A20.523,20.523,0,0,0,15.2,35.139a10.266,10.266,0,0,1-9.581-7.107,12.923,12.923,0,0,0,1.935.159,10.838,10.838,0,0,0,2.7-.349A10.249,10.249,0,0,1,2.03,17.784v-.127a10.32,10.32,0,0,0,4.632,1.3A10.263,10.263,0,0,1,3.49,5.253,29.128,29.128,0,0,0,24.619,15.976a11.568,11.568,0,0,1-.254-2.348A10.257,10.257,0,0,1,42.1,6.617a20.175,20.175,0,0,0,6.5-2.475A10.22,10.22,0,0,1,44.1,9.789,20.543,20.543,0,0,0,50,8.2a22.028,22.028,0,0,1-5.139,5.3Z'
            transform='translate(0 -3.381)'
            fill={color}
          />
        </svg>
      </a>
    </div>
  );
};

export default TwitterShareButton;
