import React from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

//Styles
import styles from './TablaEmpleos.module.scss';

//Components
import Loader from '@components/GeneralUseComponents/Loader/Loader.jsx';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';

//Redux actions
import * as jobsActions from '../../../../actions/jobsActions';
const { getJobs } = jobsActions;

function TablaEmpleos(props) {
  //console.log(props);
  const router = useRouter();

  if (props.jobs.length === 0) {
    props.getJobs();
  }

  if (props.loading) return <Loader />;
  if (props.error) return <ErrorDisplayer message={props.error} />;
  if (props.jobs === 'no_jobs')
    return (
      <h4 className={styles.notAvailableJobs}>
        De momento, no estamos ofreciendo ninguna posición. <br /> Sin embargo,
        puedes enviarnos tu CV si te interesa formar parte del equipo Campus
        Canvas.
      </h4>
    );

  const displayOffers = () =>
    props.jobs.map((oferta) => (
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
    <React.Fragment>
      <section className={styles.main__jobs}>{displayOffers()}</section>
    </React.Fragment>
  );
}

//Map state to props
const mapStateToProps = (reducers) => {
  return reducers.jobsReducer;
};

//Map actions to props
const mapDispatchToProps = {
  getJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(TablaEmpleos);
