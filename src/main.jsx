import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from 'App'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'redux/store'
import WithErrorBoundary from 'utils/error-boundary/withErrorBoundary'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <WithErrorBoundary>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
        </WithErrorBoundary>
      </Provider>
    </BrowserRouter>
  // </StrictMode>
)
