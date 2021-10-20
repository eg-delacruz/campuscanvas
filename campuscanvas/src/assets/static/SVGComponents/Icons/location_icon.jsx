import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={30} height={36} {...props}>
      <g
        data-name='Icon feather-map-pin'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={3}
      >
        <path
          data-name='Path 589'
          d='M28.5 15C28.5 25.5 15 34.5 15 34.5S1.5 25.5 1.5 15a13.5 13.5 0 1127 0z'
          stroke='#5b0791'
        />
        <path
          data-name='Path 590'
          d='M19.5 15a4.5 4.5 0 11-4.5-4.5 4.5 4.5 0 014.5 4.5z'
          stroke='#ad2146'
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
