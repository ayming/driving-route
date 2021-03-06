import React from 'react'
import PropTypes from 'prop-types'

const ContextType = {
  store: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object,
}

class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = ContextType

  getChildContext() {
    return this.props.context
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return React.Children.only(this.props.children)
  }
}

export default App
