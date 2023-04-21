import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

//Styles
import styles from './DiscountsSearchBar.module.scss';

//hooks
import { useInputValue } from '@hooks/useInputValue';

//Components
import MiniDiscountCard from '@components/GeneralUseComponents/MiniDiscountCard/MiniDiscountCard';

const DiscountsSearchBar = ({ showDiscountsSearchBar, onClose }) => {
  const CARDS_PLACEHOLDER = [
    {
      disount_id: '6411f70dfb06a2e1426f3e5b',
      title: '5% de descuento en todos los productos',
      brand_logo:
        'https://campus-canvas-bucket.s3.eu-west-3.amazonaws.com/brand_logos/2023-03-15-38736513-logo.png',
      brand_name: 'Honor',
    },
    {
      disount_id: '64144e9b0bdeb5256cec40c1',
      title: 'Hasta 60% de descuento en Blue Tomato',
      brand_logo:
        'https://campus-canvas-bucket.s3.eu-west-3.amazonaws.com/brand_logos/2023-03-17-39731692-logo_blue_tomato.png',
      brand_name: 'Blue Tomato',
    },
    {
      disount_id: '6414af168e59407b1e46e72c',
      title: 'Descuentos en productos Nike',
      brand_logo:
        'https://campus-canvas-bucket.s3.eu-west-3.amazonaws.com/brand_logos/2023-03-17-45596457-logo_nike.svg',
      brand_name: 'Nike',
    },
    {
      disount_id: '6416f009ab73aefdc54e7972',
      title: '15% descuento en la tienda de Joma',
      brand_logo:
        'https://campus-canvas-bucket.s3.eu-west-3.amazonaws.com/brand_logos/2023-03-19-79911234-logo_joma.png',
      brand_name: 'Joma',
    },
    {
      disount_id: '6411f70dfb06a2e1426f3e5b',
      title: '5% de descuento en todos los productos',
      brand_logo:
        'https://campus-canvas-bucket.s3.eu-west-3.amazonaws.com/brand_logos/2023-03-15-38736513-logo.png',
      brand_name: 'Honor',
    },
    {
      disount_id: '64144e9b0bdeb5256cec40c1',
      title: 'Hasta 60% de descuento en Blue Tomato',
      brand_logo:
        'https://campus-canvas-bucket.s3.eu-west-3.amazonaws.com/brand_logos/2023-03-17-39731692-logo_blue_tomato.png',
      brand_name: 'Blue Tomato',
    },
    {
      disount_id: '6414af168e59407b1e46e72c',
      title: 'Descuentos en productos Nike',
      brand_logo:
        'https://campus-canvas-bucket.s3.eu-west-3.amazonaws.com/brand_logos/2023-03-17-45596457-logo_nike.svg',
      brand_name: 'Nike',
    },
    {
      disount_id: '6416f009ab73aefdc54e7972',
      title: '15% descuento en la tienda de Joma',
      brand_logo:
        'https://campus-canvas-bucket.s3.eu-west-3.amazonaws.com/brand_logos/2023-03-19-79911234-logo_joma.png',
      brand_name: 'Joma',
    },
  ];
  //Needed to avoid problems with the SSR
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  //Controlling inputs
  const SEARCH_INPUT = useInputValue('');

  //Functions
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const discountsSearchBarContent = showDiscountsSearchBar ? (
    //The overlay is the black background
    <div className={styles.overlay} onClick={handleClose}>
      {/*The modal is the white box*/}
      <div
        onClick={(e) => {
          //Needed to avoid that the modal closes if clicked
          e.stopPropagation();
        }}
        className={styles.modal}
      >
        <div className={styles.content}>
          <button className={styles.close_button} onClick={handleClose}>
            X
          </button>
          <input
            type='text'
            placeholder='Marcas, artículos o categorías'
            className={styles.search_bar}
            name='search'
            id='search'
            value={SEARCH_INPUT.value}
            onChange={SEARCH_INPUT.onChange}
            autoFocus
          />

          <div className={styles.results_container}>
            {/*TODO: If no results, show a message */}
            {/*TODO: If user hasn´t searched, don´t show anything or show suggested things */}
            <div className={styles.results}>
              <h3>Descuentos estudiantes</h3>
              <div className={styles.results_grid}>
                {CARDS_PLACEHOLDER.map((card) => (
                  <MiniDiscountCard
                    closeSearchBar={onClose}
                    key={card.disount_id}
                    discount_id={card.disount_id}
                    title={card.title}
                    brand_logo={card.brand_logo}
                    brand_name={card.brand_name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return isClient
    ? createPortal(
        discountsSearchBarContent,
        document.getElementById('modal-root')
      )
    : null;
};

export default DiscountsSearchBar;
