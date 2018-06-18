import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Link from '../Link'
import s from './Header.scss'

class Header extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const { className } = this.props
    return (
      <header className={classnames(s.wrapper, className)}>
        <Link className={s.title} to="/">
          <span className={s.first}>Driving</span>{' '}
          <span className={s.last}>Route</span>
        </Link>
      </header>
    )
  }
}

export default Header
