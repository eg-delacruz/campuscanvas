import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Styles
import './TablaEmpleos.scoped.scss';

//Components
import Loader from '../../components/Loader/Loader.jsx';
import ErrorDisplayer from '../../components/ErrorDisplayer/ErrorDisplayer';

//Redux actions
import * as jobsActions from '../../actions/jobsActions';
const { getJobs } = jobsActions;

function TablaEmpleos(props) {
  //console.log(props);

  if (props.jobs.length === 0) {
    props.getJobs();
  }

  if (props.loading) return <Loader />;
  if (props.error) return <ErrorDisplayer message={props.error} />;
  if (props.jobs === 'no_jobs')
    return (
      <h4 className='notAvailableJobs'>
        De momento, no estamos ofreciendo ninguna posición. <br /> Sin embargo,
        puedes enviarnos tu CV si te interesa formar parte del equipo Campus
        Canvas.
      </h4>
    );

  const displayOffers = () =>
    props.jobs.map((oferta) => (
      <article key={oferta.id} className='jobCard'>
        <h4 className='jobCardTitle'>{oferta.JobTitle}</h4>
        <p>{oferta.CardDescription}</p>
        <Link className='btn button--purple' to={`/empleo/${oferta.id}`}>
          Más información
        </Link>
      </article>
    ));

  return (
    <React.Fragment>
      <section className='main__jobs'>{displayOffers()}</section>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablaEmpleos);
