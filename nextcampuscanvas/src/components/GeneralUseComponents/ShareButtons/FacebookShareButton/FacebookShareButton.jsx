const FacebookShareButton = ({
  width = 50,
  height = 50,
  color = '#4867AA',
  URL = 'https://www.campuscanvas.net/',
}) => {
  //CLARIFICATIONS:
  //1. Pass this in props if we want to share the current page:
  //const currentURL = encodeURI(window.location.href);
  //2. FB looks for the metatags of the passed URL to create the post to share. If we are passing the metatags client side, FB won´t recognize them, so when using this componente, that page should have its meta tags SSR, SSG or ISG generated. If meta tags are client side generated, this will still work, but the post on fb will habe an undefined, which is bad for SEO.

  const ShareURL = `https://www.facebook.com/sharer.php?u=${URL}`;

  return (
    <div>
      <a href={ShareURL} target={'_blank'}>
        <svg width={width} height={height} viewBox='0 0 50 50'>
          <path
            id='Icon_awesome-facebook-square'
            data-name='Icon awesome-facebook-square'
            d='M44.643,2.25H5.357A5.357,5.357,0,0,0,0,7.607V46.893A5.357,5.357,0,0,0,5.357,52.25H20.675v-17H13.644v-8h7.031v-6.1c0-6.936,4.129-10.768,10.454-10.768a42.6,42.6,0,0,1,6.2.54v6.808h-3.49c-3.439,0-4.511,2.134-4.511,4.323v5.2H37l-1.228,8H29.325v17H44.643A5.357,5.357,0,0,0,50,46.893V7.607A5.357,5.357,0,0,0,44.643,2.25Z'
            transform='translate(0 -2.25)'
            fill={color}
          />
        </svg>
      </a>
    </div>
  );
};

export default FacebookShareButton;
