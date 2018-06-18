import React from 'react'

import HomePanel from './components/HomePanel'
import GMap from '../../components/GMap'
import s from './Home.scss'

class Home extends React.PureComponent {
  state = {
    routeList: [],
  }

  handleRouteListChange = routeList => {
    this.setState({ routeList })
  }

  render() {
    const { routeList } = this.state
    return (
      <div className={s.wrapper}>
        <HomePanel
          className={s.panel}
          onRouteListChange={this.handleRouteListChange}
        />
        <div className={s.map}>
          <GMap routeList={routeList} />
        </div>
      </div>
    )
  }
}

export default Home
