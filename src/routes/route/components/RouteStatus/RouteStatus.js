import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Link from '../../../../components/Link'
import Icon from '../../../../components/Icon'
import s from './RouteStatus.scss'

class RouteStatus extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    token: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['loading', 'in progress', 'failure', 'success']),
    error: PropTypes.string,
    getRoute: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
    status: 'loading',
    error: '',
  }

  handleRetryClick = event => {
    event.preventDefault()

    const { token, getRoute } = this.props
    getRoute(token)
  }

  renderLoading() {
    return (
      <div className={s.center}>
        <Icon className={s.loading} type="loading" spin /> Loading...
      </div>
    )
  }

  renderInProgress() {
    return (
      <div className={s.center}>
        Processing. Please wait a moment. (
        <a href="#retry" onClick={this.handleRetryClick}>
          Click me to retry
        </a>
        )
      </div>
    )
  }

  renderFailure(error) {
    return (
      <div className={s.container}>
        <h1 className={s.title}>Error</h1>
        <div>{error}</div>
        <Link to="/">Go Back</Link>
      </div>
    )
  }

  render() {
    const { className, status, error } = this.props

    if (status === 'success') return null

    return (
      <div className={classnames(className, s.wrapper)}>
        {status === 'loading' && this.renderLoading()}
        {status === 'in progress' && this.renderInProgress()}
        {status === 'failure' && this.renderFailure(error)}
      </div>
    )
  }
}

export default RouteStatus
