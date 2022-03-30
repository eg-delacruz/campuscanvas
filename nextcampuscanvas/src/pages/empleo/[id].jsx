import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';

//Components
import JobTemplate from '@components/UsedInSpecificRoutes/Jobs/JobTemplate/JobTemplate';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';
import Layout from '@components/GeneralUseComponents/Layout/Layout';

//Redux actions
import * as jobsActions from '../../actions/jobsActions';
const { getJobs } = jobsActions;

const JobDescription = (props) => {
  const router = useRouter();

  console.log(props);

  const {
    query: { id },
  } = router;

  if (props.jobs.length === 0) {
    props.getJobs();
  }

  if (props.jobs === 'no_jobs') {
    router.push('/notfound');
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
      <Head>
        <title>Empleo | Campus Canvas</title>
        <meta
          name='Empleo'
          content='Descripción de posición de empleo en Campus Canvas'
        />
        {/* Prevents horizontal scroll due to animations on phone */}
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1.0'
        />
      </Head>
      <Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(JobDescription);
