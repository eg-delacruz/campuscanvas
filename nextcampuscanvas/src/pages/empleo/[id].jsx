import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

//Components
import JobTemplate from '@components/UsedInSpecificRoutes/Jobs/JobTemplate/JobTemplate';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

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
      <SEOHeader
        tabTitle={'Empleo'}
        metaName={'Empleo'}
        description={'Descripción de posición de empleo en Campus Canvas'}
      />

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
