import AppContainer from './containers/App';

import IndexPage from './pages/Index';
import AboutPage from './pages/About';

export default store => {

  return [{
    path: '/',
    component: AppContainer,
    indexRoute: {
      component: IndexPage
    },
    childRoutes: [{
      path: '/about',
      component: AboutPage
    }]
  }];
};
