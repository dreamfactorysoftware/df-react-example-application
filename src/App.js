import React, {
  useEffect,
} from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ContactPage from './ContactPage';
import ContactsPage from './ContactsPage';
import GroupPage from './GroupPage';
import GroupsPage from './GroupsPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import NoMatchPage from './NoMatchPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path='/'>
        	<HomePage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <PrivateRoute path='/contact/:id'>
          <ContactPage />
        </PrivateRoute>
    		<PrivateRoute path='/contact'>
          <ContactsPage />
        </PrivateRoute>
        <PrivateRoute path='/group/:id'>
          <GroupPage />
        </PrivateRoute>
    		<PrivateRoute path='/group'>
          <GroupsPage />
        </PrivateRoute>
        <Route path="*">
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
}
