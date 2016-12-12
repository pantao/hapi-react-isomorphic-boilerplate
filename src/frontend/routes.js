import AppContainer from './containers/App';
import TestingContainer from './containers/Testing';

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
    },{
      path: '/testing',
      component: TestingContainer
    }]
  }];
};
