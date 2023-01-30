import './App.css'
import HomePage from "./pages/home/home.page"
import LoginPage from './pages/login/login.page'
import ProfilePage from './pages/profile/profile.page'

import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./auth.route"
import { useLocation } from 'react-router-dom'
import Container from './components/container/container.component'
import Sidebar from './components/sidebar/sidebar.component'
import Explore from './components/explore/explore.component'
import { useSelector } from 'react-redux'

function App(props) {
  // useReduxStore?? useMobXStore?? .. then use the provider here inside the app and pass the used store to it (good practice)
  
  const { pathname } = useLocation()
  const token = useSelector(state => state.auth.token)
  const isLogin = pathname.includes('login') || !token

  return (
    <div className="app">
      <Container>
        {!isLogin && <Sidebar/>}
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
      </Container>
    </div>
  )
}

export default App
