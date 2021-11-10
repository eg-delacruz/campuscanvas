import * as React from 'react';

function SvgComponent({ color = '#f5f5f5', ...props }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={50} height={50} {...props}>
      <path
        data-name='Icon awesome-facebook-square'
        d='M44.643 0H5.357A5.357 5.357 0 000 5.357v39.286A5.357 5.357 0 005.357 50h15.318V33h-7.031v-8h7.031v-6.1c0-6.936 4.129-10.768 10.454-10.768a42.6 42.6 0 016.2.54v6.808h-3.49c-3.439 0-4.511 2.134-4.511 4.323v5.2H37l-1.228 8h-6.447v17h15.318A5.357 5.357 0 0050 44.643V5.357A5.357 5.357 0 0044.643 0z'
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
