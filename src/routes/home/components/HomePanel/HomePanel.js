import React from 'react'
import classnames from 'classnames'

import Button from '../../../../components/Button'
import s from './HomePanel.scss'

class HomePanel extends React.PureComponent {
  render() {
    const { className } = this.props
    return (
      <div className={className}>
        <div className={s.container}>
          <div className={s.body}>
            <div className={s.top}>
              <div className={s.description}>ROUTE/STOPS</div>
              <Button className={s.addStop} variant="outline">
                Add Stop
              </Button>
            </div>
            <div className={s.inputList}>list</div>
          </div>
          <div className={classnames('justify', s.control)}>
            <div className={s.controlItem}>
              <Button className={s.button} color="secondary">
                Reset
              </Button>
            </div>
            <div className={s.controlItem}>
              <Button className={s.button}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePanel
