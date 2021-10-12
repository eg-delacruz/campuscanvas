import { useEffect } from 'react';
import { withRouter } from 'react-router';

const ScrollToTop = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);
  return null;
};
//withRouter "connects" this component to the router
export default withRouter(ScrollToTop);

//Source:
//https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
