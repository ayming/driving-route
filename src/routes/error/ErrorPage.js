import React from 'react'
import PropTypes from 'prop-types'

import s from './ErrorPage.scss'

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    error: null,
  }

  render() {
    const { error } = this.props
    if (__DEV__ && error) {
      const { name, stack } = error
      return (
        <div className={s.wrapper}>
          <h1 className={s.name}>{name}</h1>
          <pre className={s.stack}>{stack}</pre>
        </div>
      )
    }

    return (
      <div className={s.wrapper}>
        <h1 className={s.name}>Error</h1>
        <p>Sorry, a critical error occurred on this page.</p>
      </div>
    )
  }
}

export default ErrorPage
