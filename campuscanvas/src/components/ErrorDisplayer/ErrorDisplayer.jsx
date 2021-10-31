import React from 'react';

function Fatal(props) {
  return <p className='error__message'>{props.message}</p>;
}

export default Fatal;

//Display this component if state.error = true, sending state.error through props
