import React from 'react';

//hooks
import { useToggleOnScroll } from '@hooks/useToggleEOnScroll';

//styles
import styles from './ButtonUp.module.scss';

function ButtonUp() {
  const [buttonToggler] = useToggleOnScroll(200);
  //console.log(buttonToggler);

  return (
    <div
      className={
        buttonToggler
          ? `${styles['button-up-container']} ${styles['is-active']}`
          : styles['button-up-container']
      }
    >
      <a href='#header'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='40'
          height='40'
          viewBox='0 0 40 40'
        >
          <g
            id='Group_589'
            data-name='Group 589'
            transform='translate(-1835 -567)'
          >
            <rect
              id='Rectangle_336'
              data-name='Rectangle 336'
              width='40'
              height='40'
              rx='5'
              transform='translate(1835 567)'
              fill='#ad2146'
              className={styles['button-up__background']}
            />
            <path
              id='Subtraction_34'
              data-name='Subtraction 34'
              d='M12.453,24.907A12.453,12.453,0,0,1,3.647,3.647,12.453,12.453,0,0,1,21.259,21.259,12.372,12.372,0,0,1,12.453,24.907Zm.157-13.519a.565.565,0,0,1,.4.166l8.081,8.081v-6L13.009,5.55a.563.563,0,0,0-.8,0L4.222,13.54v6l7.989-7.989A.565.565,0,0,1,12.61,11.388Z'
              transform='translate(1842.558 574.558)'
              fill='#f5f5f5'
              className={styles['button-up__circle']}
            />
          </g>
        </svg>
      </a>
    </div>
  );
}

export default ButtonUp;
