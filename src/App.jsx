import './App.scss'

import { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom"
import WithAuthentication from "utils/withAuthentication" 

import Sidebar from 'components/layout/sidebar/sidebar.component'
import useWindowSize from 'hooks/useWindowSize';

const HomePage = lazy(() => import('pages/home/home.page'))
const LoginPage = lazy(() => import('pages/login/login.page'))
const ProfilePage = lazy(() => import('pages/profile/profile.page'))
const MessagesPage = lazy(() => import('pages/messages/messages.page'))
const SavedPostsPage = lazy(() => import('pages/saved-posts/saved-posts.page'))
const Explore = lazy(()=>import('components/explore/explore.component'))
const SettingsPage = lazy(()=>import('pages/settings/settings.page'))
const AppState = lazy(() => import('stateJSON' ))

function App(props) {
  const windowSize = useWindowSize()
  return (
    <div className="app" style={{ maxHeight: windowSize.height, maxWidth: windowSize.width }}>
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
          <WithAuthentication>
              {<Sidebar/>}
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
          </WithAuthentication>
        </Suspense>
    </div>
  )
}

export default App
