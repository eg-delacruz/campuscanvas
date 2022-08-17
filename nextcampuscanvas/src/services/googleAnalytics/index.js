// log the pageview with their URL
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

// log specific events happening.
//See step 5 of: https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/
export const event = ({ action, params }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params);
  }
};
