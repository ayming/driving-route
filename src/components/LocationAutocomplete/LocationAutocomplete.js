import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import s from './LocationAutocomplete.scss'

class LocationAutocomplete extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.shape({
      componentRestrictions: PropTypes.shape({
        country: PropTypes.string,
        postalCode: PropTypes.string,
      }),
    }),
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    options: {
      componentRestrictions: { country: 'hk' },
    },
    onError: name => {
      console.warn(`Location result '${name}' not found!`)
    },
  }

  componentDidUpdate(prevProps) {
    if (this.props.options !== prevProps.options) {
      this.init(this.input)
    }
  }

  componentWillUnmount() {
    this.listener && this.listener.remove()
  }

  init = ref => {
    if (!ref) return

    const { options } = this.props
    const autocomplete = new google.maps.places.Autocomplete(ref, options)
    this.listener = autocomplete.addListener(
      'place_changed',
      this.handlePlacesChanged
    )
    this.input = ref
    this.autocomplete = autocomplete
  }

  handlePlacesChanged = () => {
    const { geometry, name } = this.autocomplete.getPlace()
    if (!geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      const { onError } = this.props
      return onError(name)
    }

    const { onChange } = this.props
    const { location } = geometry
    onChange([location.lat().toString(), location.lng().toString()], name)
  }

  render() {
    const { className, onChange, ...props } = this.props
    return (
      <div className={classnames(s.wrapper, className)}>
        <input ref={this.init} type="text" className={s.input} {...props} />
        <div className={s.border} />
      </div>
    )
  }
}

export default LocationAutocomplete
