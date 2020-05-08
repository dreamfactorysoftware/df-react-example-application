import React from 'react';
import {
  useLocation
} from "react-router-dom";
import Layout from './Layout'

export default function NoMatchPage() {
  let location = useLocation();

  return (
    <Layout>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </Layout>
  );
}
