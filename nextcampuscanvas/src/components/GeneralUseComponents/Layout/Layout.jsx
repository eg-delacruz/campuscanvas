import React from 'react';

//Components
import Header from '../Header/Header';
import FooterWithoutSignature from '../FooterWithoutSignature/FooterWithoutSignature';
import FooterSignature from '../FooterSignature/FooterSignature';

function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <FooterWithoutSignature />
      <FooterSignature />
    </React.Fragment>
  );
}

export default Layout;
