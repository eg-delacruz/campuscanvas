import { useState } from 'react';
import PropTypes from 'prop-types';

//Hooks
import useDisplayIfVerified from '@hooks/useDisplayIfVerified';

//Styles
import styles from './RateDiscountSnippet.module.scss';

const RateDiscountSnippet = ({ discount_id }) => {
  const { allowDisplay } = useDisplayIfVerified();
  const [state, setState] = useState({
    unrated: true,
    positive_rated: false,
    negative_rated: false,
  });

  const handlePositiveRated = () => {
    setState({ ...state, positive_rated: true, unrated: false });
    //Add positive rated in DB
  };
  const handleNegativeRated = () => {
    setState({ ...state, negative_rated: true, unrated: false });
    //Add negative rated in DB
  };

  const thankFeedbackMessage = () => (
    <div className={styles.after_feedback_message_container}>
      <h5>¡Gracias por tu feedback!</h5>
      <p>Lo apreciamos mucho y lo utilizaremos para mejorar Campus Canvas</p>
    </div>
  );

  return (
    <>
      {allowDisplay && (
        <div className={styles.container}>
          {state.unrated ? (
            <>
              <h4 className={styles.unrated_title}>
                ¿Qué te parece esta oferta?
              </h4>
              <div className={styles.buttons_container}>
                <div
                  onClick={handlePositiveRated}
                  className={`${styles.button} ${styles.thumbUp}`}
                >
                  <span>👍</span>
                </div>
                <div
                  onClick={handleNegativeRated}
                  className={`${styles.button} ${styles.thumbDown}`}
                >
                  <span>👎</span>
                </div>
              </div>
            </>
          ) : state.negative_rated ? (
            //       Negative rated
            <div className={styles.after_feedback_container}>
              <div className={styles.buttons_container}>
                <div
                  className={`${styles.button} ${styles.thumbUp} ${styles.thumbVanished}`}
                >
                  <span>👍</span>
                </div>
                <div className={`${styles.button} ${styles.thumbDown}`}>
                  <span>👎</span>
                </div>
              </div>
              {thankFeedbackMessage()}
            </div>
          ) : (
            //       Positive rated
            <div className={styles.after_feedback_container}>
              <div className={styles.buttons_container}>
                <div className={`${styles.button} ${styles.thumbUp} `}>
                  <span>👍</span>
                </div>
                <div
                  className={`${styles.button} ${styles.thumbDown} ${styles.thumbVanished}`}
                >
                  <span>👎</span>
                </div>
              </div>
              {thankFeedbackMessage()}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RateDiscountSnippet;

RateDiscountSnippet.propTypes = {
  discount_id: PropTypes.string.isRequired,
};
