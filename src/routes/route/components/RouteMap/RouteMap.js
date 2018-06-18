import React from 'react'
import PropTypes from 'prop-types'

import GMap from '../../../../components/GMap'

class RouteMap extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    path: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  }

  static defaultProps = {
    path: [],
  }

  render() {
    const { className, path } = this.props
    return (
      <div className={className}>
        <GMap routeList={path} />
      </div>
    )
  }
}

export default RouteMap
