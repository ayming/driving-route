import React from 'react'

class HomePanel extends React.PureComponent {
  render() {
    const { className } = this.props
    return <div className={className}>Panel</div>
  }
}

export default HomePanel
