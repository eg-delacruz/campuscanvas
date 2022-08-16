const WhatsAppShareButton = ({
  width = 50,
  height = 50,
  color = '#f5f5f5f5',
  postTitle = '',
  URL = 'https://www.campuscanvas.net/',
}) => {
  //Pass this in props if we want to share the current page
  //const currentURL = encodeURI(window.location.href);

  const ShareURL = `https://api.whatsapp.com/send?text=${postTitle} ${URL}`;
  return (
    <div>
      <a href={ShareURL} target={'_blank'}>
        <svg width={width} height={height} viewBox='0 0 50 50'>
          <path
            id='Icon_awesome-whatsapp'
            data-name='Icon awesome-whatsapp'
            d='M42.511,9.516a24.785,24.785,0,0,0-39,29.9L0,52.25,13.136,48.8a24.7,24.7,0,0,0,11.842,3.013h.011A25.015,25.015,0,0,0,50,27.038,24.874,24.874,0,0,0,42.511,9.516ZM24.989,47.641A20.557,20.557,0,0,1,14.5,44.772l-.748-.446L5.96,46.368l2.076-7.6-.491-.781a20.634,20.634,0,1,1,38.27-10.949A20.824,20.824,0,0,1,24.989,47.641ZM36.283,32.217c-.614-.312-3.661-1.808-4.23-2.009s-.982-.312-1.4.313-1.6,2.009-1.964,2.433-.725.469-1.339.156c-3.638-1.819-6.027-3.248-8.426-7.366-.636-1.094.636-1.016,1.819-3.382a1.147,1.147,0,0,0-.056-1.083c-.156-.312-1.4-3.359-1.908-4.6-.5-1.205-1.016-1.038-1.4-1.06-.357-.022-.77-.022-1.183-.022a2.293,2.293,0,0,0-1.652.77,6.957,6.957,0,0,0-2.165,5.167c0,3.047,2.221,5.993,2.522,6.406s4.364,6.663,10.58,9.353c3.929,1.7,5.469,1.842,7.433,1.551,1.194-.179,3.661-1.5,4.174-2.946a5.178,5.178,0,0,0,.357-2.946C37.31,32.674,36.9,32.518,36.283,32.217Z'
            transform='translate(0 -2.25)'
            fill={color}
          />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppShareButton;
