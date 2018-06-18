import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header'
import s from './Layout.scss'

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props
    return (
      <div className={s.wrapper}>
        <Header className={s.header} />
        <div className={s.body}>{children}</div>
      </div>
    )
  }
}

export default Layout
