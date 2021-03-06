import React from 'react'
import PropTypes from 'prop-types'

import s from './NotFound.scss'

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    const { title } = this.props
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p>Sorry, the page you were trying to view does not exist.</p>
        </div>
      </div>
    )
  }
}

export default NotFound
