import React from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import Auth from './Auth';
import Layout from './Layout';

export default function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    Auth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
  	<Layout>
	    <div>
	      <p>You must log in to view the page at {from.pathname}</p>
	      <button onClick={login}>Log in</button>
	    </div>
  	</Layout>
  );
}