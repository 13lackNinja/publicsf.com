import ReactGA from 'react-ga';

// Initialize the ReactGA service.
ReactGA.initialize('UA-19629638-1');

// Track pageviews using url pathname string plus the provided url query parameters.
ReactGA.pageview(window.location.pathname + window.location.search);
