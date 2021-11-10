import * as React from 'react';

function SvgComponent({ color = '#f5f5f5', ...props }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={49.688}
      height={49.688}
      {...props}
    >
      <path
        data-name='Icon awesome-linkedin'
        d='M46.139 0H3.538A3.565 3.565 0 000 3.582v42.524a3.565 3.565 0 003.538 3.582h42.6a3.574 3.574 0 003.549-3.582V3.582A3.574 3.574 0 0046.139 0zM15.017 42.59H7.653V18.877h7.376V42.59zm-3.682-26.951a4.27 4.27 0 114.27-4.27 4.272 4.272 0 01-4.27 4.27zM42.623 42.59h-7.364V31.055c0-2.751-.055-6.289-3.826-6.289-3.838 0-4.425 2.995-4.425 6.089V42.59h-7.365V18.877h7.065v3.239h.1a7.757 7.757 0 016.976-3.826c7.453 0 8.84 4.913 8.84 11.3z'
        fill={color}
      />
    </svg>
  );
}

export default SvgComponent;
