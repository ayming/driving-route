import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps'

class GMap extends React.PureComponent {
  static propTypes = {
    defaultZoom: PropTypes.number,
    defaultCenter: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
    routeList: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  }

  static defaultProps = {
    defaultZoom: 11,
    defaultCenter: { lat: 22.375, lng: 114.154 },
    routeList: [],
  }

  state = {}

  componentDidMount() {
    this.prepareRoute(this.props.routeList)
  }

  componentDidUpdate(prevProps) {
    if (this.props.routeList !== prevProps.routeList) {
      this.prepareRoute(this.props.routeList)
    }
  }

  prepareRoute(routeList) {
    if (routeList.length >= 2) {
      return this.placeDirections(routeList)
    } else if (routeList.length === 1) {
      return this.placeMarker(routeList[0])
    } else {
      this.setState({
        marker: null,
        directions: null,
      })
    }
  }

  placeMarker(route) {
    this.setState({
      marker: this.createLatLng(route),
      directions: null,
    })
  }

  placeDirections(routeList) {
    const directionsService = new google.maps.DirectionsService()
    directionsService.route(
      {
        origin: this.createLatLng(routeList[0]),
        destination: this.createLatLng(routeList[routeList.length - 1]),
        waypoints: routeList
          .slice(1, routeList.length - 1)
          .map(route => ({ location: this.createLatLng(route) })),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            marker: null,
            directions: result,
          })
        } else {
          console.error(`error fetching directions ${result}`)
        }
      }
    )
  }

  createLatLng([lat, lng]) {
    return new google.maps.LatLng(parseFloat(lat), parseFloat(lng))
  }

  render() {
    const { defaultZoom, defaultCenter } = this.props
    const { marker, directions } = this.state
    return (
      <GoogleMap
        zoom={marker ? 17 : defaultZoom}
        center={marker || defaultCenter}
      >
        {marker && <Marker position={marker} />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    )
  }
}

export default compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
)(GMap)
