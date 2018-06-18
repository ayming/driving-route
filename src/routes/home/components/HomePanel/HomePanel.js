import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import LocationAutocomplete from '../../../../components/LocationAutocomplete'
import Icon from '../../../../components/Icon'
import Button from '../../../../components/Button'
import history from '../../../../history'
import s from './HomePanel.scss'

class HomePanel extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onRouteListChange: PropTypes.func.isRequired,
    submitRoute: PropTypes.func.isRequired,
  }

  lastRouteId = 0

  constructor() {
    super()

    this.state = {
      routeList: [this.createLocation(), this.createLocation()],
    }
  }

  createLocation() {
    this.lastRouteId += 1
    return { id: this.lastRouteId, name: '', point: null }
  }

  convertRouteList(routeList) {
    return routeList.reduce((prev, { point }) => {
      return point ? [...prev, point] : prev
    }, [])
  }

  handleRouteListChange = routeList => {
    const { onRouteListChange } = this.props
    onRouteListChange(this.convertRouteList(routeList))
    this.setState({ routeList })
  }

  handleAddStop = () => {
    const { routeList } = this.state
    const nextRouteList = [...routeList, this.createLocation()]
    this.handleRouteListChange(nextRouteList)
  }

  handleRemoveStop = index => () => {
    const { routeList } = this.state
    const nextRouteList = [
      ...routeList.slice(0, index),
      ...routeList.slice(index + 1),
    ]
    this.handleRouteListChange(nextRouteList)
  }

  handleRouteChange = index => (point, name) => {
    const { routeList } = this.state
    const nextRouteList = [
      ...routeList.slice(0, index),
      { ...routeList[index], point, name },
      ...routeList.slice(index + 1),
    ]
    this.handleRouteListChange(nextRouteList)
  }

  handleResetClick = () => {
    this.handleRouteListChange([this.createLocation(), this.createLocation()])
  }

  handleSubmitClick = () => {
    const { routeList } = this.state
    const data = this.convertRouteList(routeList)
    if (data.length < 2) {
      alert('Please input at least 2 locations')
    } else {
      const { submitRoute } = this.props
      submitRoute(data)
        .then(({ token }) => history.push(`/route/${token}`))
        .catch(() => alert('Submit fail!'))
    }
  }

  render() {
    const { className, isLoading } = this.props
    const { routeList } = this.state
    return (
      <div className={classnames({ [s.loading]: isLoading }, className)}>
        <div className={s.container}>
          <div className={s.body}>
            <div className={s.top}>
              <div className={s.description}>ROUTE/STOPS</div>
              <Button
                className={s.addStop}
                variant="outline"
                disabled={routeList.length >= 20}
                onClick={this.handleAddStop}
              >
                Add Stop
              </Button>
            </div>
            <div className={s.inputList}>
              {routeList.map(({ id }, index) => {
                const isFirst = index === 0
                const isLast = index === routeList.length - 1
                const { placeholder, icon } = (() => {
                  if (isFirst)
                    return {
                      placeholder: 'Route Start Location',
                      icon: 'circle',
                    }
                  if (isLast)
                    return { placeholder: 'Drop Off Location', icon: 'marker' }
                  return { placeholder: 'Stop Location', icon: 'dot' }
                })()
                return (
                  <div key={`input-${id}`} className={s.inputGroup}>
                    <div className={s.inputGroupPrepend}>
                      <Icon className={s.icon} type={icon} />
                    </div>
                    <LocationAutocomplete
                      className={s.input}
                      placeholder={placeholder}
                      onChange={this.handleRouteChange(index)}
                    />
                    {!isFirst &&
                      !isLast && (
                        <div
                          className={s.close}
                          onClick={this.handleRemoveStop(index)}
                        />
                      )}
                  </div>
                )
              })}
            </div>
          </div>
          <div className={classnames('justify', s.control)}>
            <div className={s.controlItem}>
              <Button
                className={s.button}
                color="secondary"
                onClick={this.handleResetClick}
              >
                Reset
              </Button>
            </div>
            <div className={s.controlItem}>
              <Button className={s.button} onClick={this.handleSubmitClick}>
                {isLoading ? <Icon type="loading" spin /> : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePanel
