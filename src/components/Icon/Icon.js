/**
 * Fontawesome component
 * @see https://github.com/FortAwesome/react-fontawesome
 */
import React from 'react'
import PropTypes from 'prop-types'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCircleNotch from '@fortawesome/fontawesome-free-solid/faCircleNotch'
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt'
import faCircle from '@fortawesome/fontawesome-free-regular/faCircle'
import faDotCircle from '@fortawesome/fontawesome-free-regular/faDotCircle'

fontawesome.library.add(faCircleNotch, faMapMarkerAlt, faCircle, faDotCircle)

const TYPE = {
  loading: ['fas', 'circle-notch'],
  marker: ['fas', 'map-marker-alt'],
  circle: ['far', 'circle'],
  dot: ['far', 'dot-circle'],
}

class Icon extends React.PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(Object.keys(TYPE)).isRequired,
  }

  render() {
    const { type, ...props } = this.props
    return <FontAwesomeIcon {...props} icon={TYPE[type]} />
  }
}

export default Icon
