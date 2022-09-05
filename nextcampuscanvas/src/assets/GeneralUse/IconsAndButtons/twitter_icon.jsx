import * as React from 'react';

function SvgComponent({ color = '#f5f5f5', ...props }) {
  return (
    <svg width={50} height={50} {...props} viewBox='0 0 49.989 49.989'>
      <path
        data-name='Icon awesome-twitter-square'
        d='M44.633,2.25H5.356A5.357,5.357,0,0,0,0,7.606V46.883a5.357,5.357,0,0,0,5.356,5.356H44.633a5.357,5.357,0,0,0,5.356-5.356V7.606A5.357,5.357,0,0,0,44.633,2.25ZM39.177,19.969c.022.312.022.636.022.948,0,9.674-7.364,20.821-20.821,20.821A20.725,20.725,0,0,1,7.141,38.459a15.418,15.418,0,0,0,1.763.089,14.672,14.672,0,0,0,9.083-3.124,7.328,7.328,0,0,1-6.84-5.077,7.887,7.887,0,0,0,3.3-.134,7.319,7.319,0,0,1-5.858-7.186v-.089a7.313,7.313,0,0,0,3.3.926,7.3,7.3,0,0,1-3.258-6.092,7.227,7.227,0,0,1,.993-3.693,20.779,20.779,0,0,0,15.086,7.655A7.334,7.334,0,0,1,37.2,15.049a14.34,14.34,0,0,0,4.642-1.763,7.3,7.3,0,0,1-3.214,4.028,14.563,14.563,0,0,0,4.218-1.138A15.4,15.4,0,0,1,39.177,19.969Z'
        transform='translate(0 -2.25)'
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
