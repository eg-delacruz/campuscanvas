import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

//Components
import JobTemplate from '@components/UsedInSpecificRoutes/Jobs/JobTemplate/JobTemplate';
import Loader from '@components/GeneralUseComponents/Loader/Loader';
import ErrorDisplayer from '@components/GeneralUseComponents/ErrorDisplayer/ErrorDisplayer';
import Layout from '@components/GeneralUseComponents/Layout/Layout';
import SEOHeader from '@components/GeneralUseComponents/SEO_Header/SEOHeader';

//Redux actions
import { getJobs, selectJobs } from '@redux/jobsSlice';

const JobDescription = (props) => {
  //Allows us to manipulate the appropriate slice/action
  const dispatch = useDispatch();

  //Reducers
  const jobsReducer = useSelector(selectJobs);

  const router = useRouter();

  const {
    query: { id },
  } = router;

  if (jobsReducer.jobs.length === 0) {
    dispatch(getJobs());
  }

  if (jobsReducer.jobs === 'no_jobs') {
    router.push('/notfound');
  }

  const DESCRIPTION = jobsReducer.jobs.find((item) => {
    return item.id === Number(id);
  });

  if (jobsReducer.loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  if (jobsReducer.error)
    return (
      <Layout>
        <ErrorDisplayer message={jobsReducer.error} />
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

export default JobDescription;
