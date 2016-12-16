import AppContainer from './containers/App';
import TestingContainer from './containers/Testing';

import IndexPage from './pages/Index';
import AboutPage from './pages/About';
import SignPage from './pages/Sign';
import DashboardPage from './pages/Dashboard';

export default store => {

  const checkSession = callback => {
    const {
      session
    } = store.getState();
    callback(session);
  }

  const redirectToSign = (next, replace, callback) => {
    checkSession(session => {
      if (!session.me || session.me.error) {
        replace('/sign')
      }
      callback()
    });
  }

  const redirectToDashboard = (next, replace, callback) => {
    checkSession(session => {
      if (session.me && session.me.id) {
        replace('/dashboard')
      }
      callback()
    });
  }

  const AppRoute = AppContainer(store);

  AppRoute.indexRoute = {
    component: IndexPage
  };

  AppRoute.childRoutes = [{
    path: '/about',
    component: AboutPage
  }, {
    path: '/sign(/:action)',
    onEnter: redirectToDashboard,
    component: SignPage
  }, {
    path: '/dashboard',
    onEnter: redirectToSign,
    component: DashboardPage
  }, TestingContainer(store)]

  return [AppRoute];
};
