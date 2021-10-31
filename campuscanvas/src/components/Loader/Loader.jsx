import React from 'react';
import './Loader.scoped.scss';

function Spinner() {
  return (
    <div className='center'>
      <div className='lds-ripple'>
        <div />
        <div />
      </div>
    </div>
  );
}

export default Spinner;
