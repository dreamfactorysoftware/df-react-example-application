import React, {
  useCallback,
} from 'react';
import {
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';
import {
  Button,
} from 'semantic-ui-react';
import isFunction from 'lodash.isfunction';
import { auth } from '../../services/auth';

export default function LogInAndOutButton({ onLogOut, inverted }) {
  const history = useHistory();
  const location = useLocation();
  const redirectTo = '/';

  const logOut = useCallback(() => auth.signout().then(() => {
  	if (location.pathname !== redirectTo) {
  		history.push(redirectTo);
  	} else if (isFunction(onLogOut)) {
  		onLogOut();
  	}
	}), [onLogOut, history, location.pathname]);

  return auth.isAuthenticated ? (
    <Button inverted={inverted} onClick={logOut}>
      Log out
    </Button>
  ) : (
    <Button as={Link} to='/login' inverted={inverted}>
      Log in
    </Button>
  );
}
