import React from 'react'
import PropTypes from 'prop-types'

import RouteMapContainer from './containers/RouteMapContainer'
import RouteStatusContainer from './containers/RouteStatusContainer'
import s from './Route.scss'

class Route extends React.PureComponent {
  static propTypes = {
    token: PropTypes.string.isRequired,
  }

  render() {
    const { token } = this.props
    return (
      <div className={s.wrapper}>
        <RouteMapContainer className={s.map} token={token} />
        <RouteStatusContainer className={s.status} token={token} />
      </div>
    )
  }
}

export default Route
