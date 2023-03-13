import './App.scss'

import { lazy, Suspense, useMemo } from 'react';
import { Route, Routes } from "react-router-dom"
import WithAuthentication from "utils/withAuthentication" 

import Container from 'components/layout/container/container.component'
import Sidebar from 'components/layout/sidebar/sidebar.component'

const HomePage = lazy(() => import('pages/home/home.page'))
const LoginPage = lazy(() => import('pages/login/login.page'))
const ProfilePage = lazy(() => import('pages/profile/profile.page'))
const MessagesPage = lazy(() => import('pages/messages/messages.page'))
const SavedPostsPage = lazy(() => import('pages/saved-posts/saved-posts.page'))
const Explore = lazy(()=>import('components/explore/explore.component'))
const SettingsPage = lazy(()=>import('pages/settings/settings.page'))
const AppState = lazy(() => import('stateJSON' ))

function App(props) {
  return (
    <div className="app">
      <Container>
          <Suspense>
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
          </Routes>
          </Suspense>
          <WithAuthentication>
              {<Sidebar/>}
              <Suspense>
                <Routes>
                  {
                    ['/', '/home'].map((path, index) => (
                      <Route 
                        key={index}
                        exact 
                        path={path}
                        element={<HomePage/>} 
                      />
                    ))
                  }
                  <Route path='/profile/:id'element={<ProfilePage/>}/>
                  <Route path='/messages' element={<MessagesPage/>}/>
                  <Route path='/saved' element={<SavedPostsPage/>}/>
                  <Route path='/settings' element={<SettingsPage/>}/>
                  <Route path='/explore' element={<Explore/>}/>
                  <Route path="/state" element={<AppState/>} />
                </Routes>
              </Suspense>
          </WithAuthentication>
        
      </Container>
    </div>
  )
}

export default App
