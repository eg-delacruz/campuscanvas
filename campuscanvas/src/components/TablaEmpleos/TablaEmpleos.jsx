import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//Styles
import './TablaEmpleos.scoped.scss';

//Redux actions
import * as jobsActions from '../../actions/jobsActions';
const { getJobs } = jobsActions;

function TablaEmpleos(props) {
  console.log(props.jobs);

  if (props.jobs.length === 0) {
    props.getJobs();
  }

  const displayOffers = () =>
    props.jobs.map((oferta, index) => (
      <article key={oferta.id} className='jobCard'>
        <h4 className='main_jobCardTitle'>{oferta.JobTitle}</h4>
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

//Maps actions to props
const mapDispatchToProps = {
  getJobs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablaEmpleos);

//To do:
//- Si el arreglo de JOBS está vacío, que muestre mensaje de que no estamos buscando de momento (ver cómo en curso redux)
//- Ver si puedo hacer la respuesta asíncrona con setTimeout, para así mostrar un loading
