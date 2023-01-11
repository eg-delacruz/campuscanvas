import { useState } from 'react';

//Hooks
import useDisplayIfVerified from '@hooks/useDisplayIfVerified';

//Styles
import styles from './RateOfferSnippet.module.scss';

const RateOfferSnippet = ({ offer_id }) => {
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

  return (
    <>
      {allowDisplay && (
        <div>
          {state.unrated ? (
            <div>
              <p>Valora esta oferta</p>
              <span onClick={handlePositiveRated}>Positive</span>
              <span onClick={handleNegativeRated}>Negative</span>
            </div>
          ) : state.negative_rated ? (
            <>
              <div>
                <span>Positive gray</span>
                <span>Negative </span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span>Positive </span>
                <span>Negative gray</span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default RateOfferSnippet;
