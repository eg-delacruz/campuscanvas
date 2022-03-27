import React from 'react';
import { Helmet } from 'react-helmet';

const HelmetLayout = ({ title, subtitle }) => {
  return (
    <>
      <Helmet>
        {title && <title>{title} | Campus Canvas</title>}
        {subtitle && <meta name='description' content={subtitle} />}
      </Helmet>
    </>
  );
};

export default HelmetLayout;
