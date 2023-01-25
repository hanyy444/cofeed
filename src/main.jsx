import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import WithErrorBoundary from './utils/error-boundary/WithErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <WithErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </WithErrorBoundary>
    </BrowserRouter>
  // </React.StrictMode>,
)
