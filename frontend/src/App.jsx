import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes,Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from "lucide-react"   //for icons
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore'

const App = () => {

  const {authUser,checkAuth,isCheckingAuth,onlineUsers}  = useAuthStore();
  const {theme}  = useThemeStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  
  
  if(isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
          <Loader className='size-11 animate-spin'/>
      </div>
    )
  }

  return (
    
    <>
     <div data-theme={theme}>
       <Navbar/>
      <Routes >
        <Route path='/'         element={ authUser ? <Home/>    : <Navigate to="/login"/>}/>
        <Route path='/signup'   element={!authUser ? <Signup/>  : <Navigate to="/"/>}/>
        <Route path='/login'    element={!authUser ? <Login/>   : <Navigate to="/"/>}/>
        <Route path='/profile'  element={ authUser ? <Profile/> : <Navigate to="/login"/>}/>
        <Route path='/settings' element={<Settings/>}/>
      </Routes>

      <Toaster/>
     </div>
    </>
    
  )
}

export default App