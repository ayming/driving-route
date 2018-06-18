import React from 'react'
import ReactDOM from 'react-dom'
import deepForceUpdate from 'react-deep-force-update'
import qs from 'qs'
import Waves from 'node-waves'
import 'normalize.css'
import 'node-waves/dist/waves.css'

import configureStore from './store/configureStore'
import history from './history'
import router from './router'
import App from './components/App'
// import registerServiceWorker from './registerServiceWorker'
import './index.css'

// ========================================================
// Waves Setup
// ========================================================
Waves.init()

// ========================================================
// Render Setup
// ========================================================
const context = {
  store: configureStore({}, { history }),
}

const container = document.getElementById('root')
let currentLocation = history.location
let appInstance

const scrollPositionsHistory = {}

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  }
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key]
  }
  currentLocation = location

  const isInitialRender = !action
  try {
    context.pathname = location.pathname
    context.query = qs.parse(location.search)

    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve(context)

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return
    }

    if (route.redirect) {
      history.replace(route.redirect)
      return
    }

    appInstance = ReactDOM.render(
      <App context={context}>{route.component}</App>,
      container,
      () => {
        if (isInitialRender) {
          // Switch off the native scroll restoration behavior and handle it manually
          // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
          if (window.history && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
          }

          const elem = document.getElementById('css')
          if (elem) elem.parentNode.removeChild(elem)
          return
        }

        document.title = route.title

        let scrollX = 0
        let scrollY = 0
        const pos = scrollPositionsHistory[location.key]
        if (pos) {
          scrollX = pos.scrollX
          scrollY = pos.scrollY
        } else {
          const targetHash = location.hash.substr(1)
          if (targetHash) {
            const target = document.getElementById(targetHash)
            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top
            }
          }
        }

        // Restore the scroll position if it was saved into the state
        // or scroll to the given #hash anchor
        // or scroll to top of the page
        window.scrollTo(scrollX, scrollY)
      }
    )
  } catch (error) {
    if (__DEV__) {
      throw error
    }

    console.error(error)

    // Do a full page reload if error occurs during client-side navigation
    if (!isInitialRender && currentLocation.key === location.key) {
      console.error('RSK will reload your page after error')
      window.location.reload()
    }
  }
}

history.listen(onLocationChange)
onLocationChange(currentLocation)

// Enable Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      // Force-update the whole tree, including components that refuse to update
      deepForceUpdate(appInstance)
    }

    onLocationChange(currentLocation)
  })
}

// ReactDOM.render(<App />, document.getElementById('root'))
// registerServiceWorker()
