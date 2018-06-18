import React from 'react'

import { getRoute } from '../../actions/route'
import Layout from '../../components/Layout'
import Route from './Route'

function action({ params, store }) {
  const { token } = params
  store.dispatch(getRoute(token))
  return {
    title: 'Route',
    chunks: ['route'],
    component: (
      <Layout>
        <Route token={token} />
      </Layout>
    ),
  }
}

export default action
