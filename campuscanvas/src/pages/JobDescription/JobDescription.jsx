import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//Components
import HelmetLayout from '../../components/HelmetLayout/HelmetLayout';
import JobTemplate from '../../components/JobTemplate/JobTemplate';
import Loader from '../../components/Loader/Loader';
import ErrorDisplayer from '../../components/ErrorDisplayer/ErrorDisplayer';
import Layout from '../../components/Layout/Layout';

//Redux actions
import * as jobsActions from '../../actions/jobsActions';
const { getJobs } = jobsActions;

const JobDescription = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;

  if (props.jobs.length === 0) {
    props.getJobs();
  }

  const DESCRIPTION = props.jobs.find((item) => {
    return item.id === Number(id);
  });

  if (props.loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  if (props.error)
    return (
      <Layout>
        <ErrorDisplayer message={props.error} />
      </Layout>
    );

  return (
    <>
      {props.jobs === 'no_jobs' ? <Redirect to='/notfound' /> : ''}
      <Layout>
        <HelmetLayout
          title='Empleo'
          subtitle='Descripción de posición de empleo en Campus Canvas'
        />
        <JobTemplate {...DESCRIPTION} />
      </Layout>
    </>
  );
};

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
)(JobDescription);
