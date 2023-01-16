import { useState } from 'react';

//Styles
import styles from './DisplayDiscountSnippet.module.scss';

const DisplayDiscountSnippet = ({ offer }) => {
  const [copied, setCopied] = useState(false);

  const TIEMPO_PARA_PROXIMO_CODIGO = '1h';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offer.discount_code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  //TODO: research how to display a new code after 1h if code changes-
  //Idea 1: Persist generated code in DB. If > 1h, empty array and allow new code geneartion.

  const handleOpenBrandStore = () => {
    //Open affiliate_link in new tab
    const currentTabWindow = window.open(offer.affiliate_link, '_blank');
    if (currentTabWindow) currentTabWindow.opener = null;
  };
  return (
    <div className={styles.container}>
      <p className={styles.procedure_indications}>
        <strong>
          Copia el código e ingrésalo al pagar en {offer.brand.brand_name}
        </strong>
      </p>

      <div className={styles.external_wrapper}>
        <div className={styles.code_container}>
          <div className={styles.code_wrapper}>
            <div className={styles.code_field}>
              <strong>{offer.discount_code}</strong>
            </div>
            <button onClick={handleCopyCode} className='btn button--red'>
              Copiar
            </button>
          </div>
        </div>
      </div>
      {copied && (
        <p className={styles.copied_message}>Código copiado al portapapeles</p>
      )}

      <p className={styles.new_code_indications}>
        Este código ha sido generado especialmente para ti. Por cada compra en{' '}
        {offer.brand.brand_name} necesitarás uno nuevo. Próximo código
        disponible dentro de {TIEMPO_PARA_PROXIMO_CODIGO}.
      </p>

      <button
        onClick={handleOpenBrandStore}
        className={`${styles.open_store_btn} btn button--red`}
      >
        {offer.action_btn_phrase
          ? offer.action_btn_phrase
          : `Abrir tienda de ${offer.brand.brand_name}`}
      </button>
    </div>
  );
};

export default DisplayDiscountSnippet;