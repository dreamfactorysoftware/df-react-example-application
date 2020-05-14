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
import Contact from './contacts/Contact';
import ContactList from './contacts/ContactList';
import Group from './groups/Group';
import GroupList from './groups/GroupList';
import Login from './login/Login';
import Register from './register/Register';
import HomePage from './home/Home';
import NoMatch from './NoMatch';
import './App.css';

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
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <PrivateRoute path='/contact/:id'>
          <Contact />
        </PrivateRoute>
    		<PrivateRoute path='/contact'>
          <ContactList />
        </PrivateRoute>
        <PrivateRoute path='/group/:id'>
          <Group />
        </PrivateRoute>
    		<PrivateRoute path='/group'>
          <GroupList />
        </PrivateRoute>
        <Route path='*'>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}
