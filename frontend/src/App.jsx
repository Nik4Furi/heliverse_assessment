import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

//Components

//Pages
import Register from './pages/Register'
import Login from './pages/Login'
import UsersTables from './pages/UsersTables'
import Layout from './components/Layout/Layout'
import Profile from './pages/Profile'
import Teams from './pages/Teams'

function App() {

  return (
    <>
      <BrowserRouter >


        <Routes >

          {/* Login Page  */}
          <Route path='/' element={<Login />} ></Route>

          {/* Register Page  */}
          <Route path='/Register' element={<Register />} ></Route>

          {/* ------ Users Tables --------  */}
          <Route path='/users' element={ <Layout><UsersTables /></Layout> } ></Route>

          {/* ------ Profile Page --------  */}
          <Route path='/profile' element={ <Layout><Profile /></Layout> } ></Route>

          {/* ------ Teams Page --------  */}
          <Route path='/teams' element={ <Layout><Teams /></Layout> } ></Route>


        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
