import React from 'react';
import {
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';
import {
  Button,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';
import auth from '../services/auth';

export default function LogInAndOutButton(props) {
  const history = useHistory();
  const location = useLocation();
  const redirectTo = '/';
  const logIn = () => auth.signout().then(() => {
  	if (location.pathname !== redirectTo) {
  		history.push(redirectTo);
  	} else if (isFunction(props.onLogOut)) {
  		props.onLogOut();
  	}
	});

  return auth.isAuthenticated ? (
  	<Button inverted onClick={logIn}>
      Log out
    </Button>
  ) : (
    <Button as={Link} to='/login' inverted>
      Log in
    </Button>
  );
}
