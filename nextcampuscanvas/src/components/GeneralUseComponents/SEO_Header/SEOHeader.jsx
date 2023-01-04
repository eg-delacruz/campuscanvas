import Head from 'next/head';

const SEOHeader = ({ tabTitle, metaName, description }) => {
  //Should be done like this instead of having the title tag with so many nodes/words
  const message = `${tabTitle} | Campus Canvas`;
  return (
    <Head>
      <title>{message}</title>
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
