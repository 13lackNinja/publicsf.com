import ReactGA from 'react-ga';

ReactGA.initialize('UA-19629638-1');
ReactGA.pageview(window.location.pathname + window.location.search);
