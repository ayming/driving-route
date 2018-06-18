import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './Button.scss'

class Button extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'secondary']),
    variant: PropTypes.oneOf(['contain', 'outline', 'text']),
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    className: '',
    color: 'primary',
    variant: 'contain',
  }

  render() {
    const { className, color, variant, children, ...props } = this.props
    return (
      <button
        className={classnames(
          'waves-effect waves-block',
          {
            [s.primary]: color === 'primary',
            [s.secondary]: color === 'secondary',
            [s.outline]: variant === 'outline',
            [s.text]: variant === 'text',
          },
          s.wrapper,
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
}

export default Button
