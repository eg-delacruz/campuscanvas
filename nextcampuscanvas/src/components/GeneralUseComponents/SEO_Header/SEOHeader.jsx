import React from 'react';
import Head from 'next/head';

const SEOHeader = ({ tabTitle, metaName, description }) => {
  return (
    <Head>
      <title>{tabTitle} | Campus Canvas</title>
      <meta name={metaName} content={description} />
      {/* Prevents horizontal scroll due to animations on phone */}
      <meta
        name='viewport'
        content='width=device-width, height=device-height, initial-scale=1.0'
      />
    </Head>
  );
};

export default SEOHeader;
