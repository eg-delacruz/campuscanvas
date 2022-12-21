import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

//Styles
import styles from './TablaEmpleos.module.scss';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader.jsx';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';

//Redux actions
import { getJobs, selectJobs } from '@redux/jobsSlice';

function TablaEmpleos(props) {
  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const jobsReducer = useSelector(selectJobs);

  const router = useRouter();

  if (jobsReducer.jobs.length === 0) {
    dispatch(getJobs());
  }

  if (jobsReducer.loading) return <Loader />;
  if (jobsReducer.error) return <ErrorDisplayer message={jobsReducer.error} />;
  if (jobsReducer.jobs === 'no_jobs')
    return (
      <h4 className={styles.notAvailableJobs}>
        De momento, no estamos ofreciendo ninguna posición. <br /> Sin embargo,
        puedes enviarnos tu CV si te interesa formar parte del equipo Campus
        Canvas.
      </h4>
    );

  const displayOffers = () =>
    jobsReducer.jobs.map((oferta) => (
      <article key={oferta.id} className={styles.jobCard}>
        <h4 className={styles.jobCardTitle}>{oferta.JobTitle}</h4>
        <p>{oferta.CardDescription}</p>

        <button
          className='btn button--purple'
          onClick={() => {
            router.push(
              {
                pathname: `/empleo/${oferta.id}`,
                query: { id: oferta.id },
              },
              `/empleo/${oferta.id}`
            );
          }}
        >
          Más información
        </button>
      </article>
    ));

  return (
    <>
      <section className={styles.main__jobs}>{displayOffers()}</section>
    </>
  );
}

export default TablaEmpleos;
