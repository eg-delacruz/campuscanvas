import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={31.099}
      height={31.1}
      {...props}
    >
      <path
        data-name='Icon awesome-phone-alt'
        d='M30.212 21.976l-6.8-2.916a1.458 1.458 0 00-1.7.419L18.7 23.161A22.515 22.515 0 017.933 12.4l3.681-3.013a1.454 1.454 0 00.419-1.7L9.117.881a1.468 1.468 0 00-1.67-.844L1.13 1.495A1.458 1.458 0 000 2.916 28.181 28.181 0 0028.184 31.1a1.458 1.458 0 001.421-1.13l1.458-6.317a1.475 1.475 0 00-.851-1.676z'
        fill='#5b0791'
      />
    </svg>
  );
}

export default SvgComponent;
