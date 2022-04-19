import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

//Assets
import Logo_Campus_Canvas from '@assets/GeneralUse/Logos/logo.svg';

//Styles
import styles from './SecondaryHeader.module.scss';

const SecondaryHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} container`}>
        <Link href='/'>
          <button>
            <Image src={Logo_Campus_Canvas} alt='Logo Campus Canvas' />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default SecondaryHeader;
