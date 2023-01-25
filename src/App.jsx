import './App.css'
import HomePage from "./pages/home/home.page"
import LoginPage from './pages/login/login.page'
import ProfilePage from './pages/profile/profile.page'

import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./auth.route"

import useWindowSize from "./hooks/useWindowSize"
import WithErrorBoundary from './utils/error-boundary/WithErrorBoundary'

function App(props) {

  // const windowSize = useWindowSize()

  return (
    <div className="app">
      <Routes>
        {
          ['/login', '/signup'].map((path, index) => (
            <Route 
              key={index}
              exact 
              path={path} 
              element={<LoginPage/>} 
            />
          ))
        }

        {
          ['/', '/home'].map((path, index) => (
            <Route 
              key={index}
              exact 
              path={path}
              element={
                  <ProtectedRoute>
                    <HomePage/>
                  </ProtectedRoute>
              } 
            />
          ))
        }
        <Route
          path='/profile/:id'
          element={
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
