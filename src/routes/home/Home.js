import React from 'react'

import GMap from '../../components/GMap'
import HomePanel from './components/HomePanel'
import s from './Home.scss'

class Home extends React.PureComponent {
  render() {
    return (
      <div className={s.wrapper}>
        <HomePanel className={s.panel} />
        <div className={s.map}>
          <GMap routeList={[]} />
        </div>
      </div>
    )
  }
}

export default Home
