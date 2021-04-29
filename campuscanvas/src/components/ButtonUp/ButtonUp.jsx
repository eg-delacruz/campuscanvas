import React from 'react';

//styles
import './ButtonUp.scoped.scss';

function ButtonUp() {
  return (
    <div className='button-up-container'>
      <a href='#header'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={35}
          height={35}
          viewBox='0 0 40 40'
        >
          <defs />
          <rect className='a' width={40} height={40} rx={8} />
          <path
            className='b'
            d='M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z'
            transform='translate(2 2)'
          />
          <path className='c' d='M24,18l-6-6-6,6' transform='translate(2 2)' />
          <path className='c' d='M18,24V12' transform='translate(2 2)' />
        </svg>
      </a>
    </div>
  );
}

export default ButtonUp;
