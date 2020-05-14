import React from 'react';
import {
  useLocation
} from "react-router-dom";
import Layout from './layout/Layout'

export default function NoMatch() {
  let location = useLocation();

  return (
    <Layout>
      <h1>
        Page not found <code>{location.pathname}</code>
      </h1>
    </Layout>
  );
}
