import React, { Suspense, lazy, useEffect } from 'react'

//----------------- Redux State Stuff
import { useDispatch, useSelector } from 'react-redux'
import { clearUserError, getUser } from '../Store/UsersSlice'

import { ProtectedRoute } from "protected-route-react" //------------ Protected routes

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import toast, { Toaster } from 'react-hot-toast'

//------ Global Functions
import { Token } from './GlobalFunctions'


//Components
import Loading from './components/Layout/Loading'
import Layout from './components/Layout/Layout'

//Pages
const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
const UsersTables = lazy(() => import('./pages/UsersTables'))
const Profile = lazy(() => import('./pages/Profile'))
const Teams = lazy(() => import('./pages/Teams'))


function App() {

  // console.log(import.meta.env.VITE_BACKEND_URL);
  const { user, isAuthenticated, success, msg, } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => { //Specific for handle users slice

    if (success === true && msg)
      toast.success(msg);
    else if (success === false && msg)
      toast.error(msg);

    setTimeout(() => {
      dispatch(clearUserError()); //clear all the user api stuffs
    }, 1500)

  }, [dispatch, success, msg]);

  //------------- Reflecting the users authentication
  useEffect(() => {
    if (Token)
      dispatch(getUser()); //Call the api to fetch logged in user details
  }, [dispatch])

  return (
    <>
      <BrowserRouter >

        <Suspense fallback={<Loading />}>

          <Routes >

            {/* Login Page  */}
            <Route path='/' element={
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/users' >
                <Login /> </ProtectedRoute>} ></Route>

            {/* Register Page  */}
            <Route path='/Register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect='/users' >
              <Register /></ProtectedRoute>} ></Route>

            {/* ------ Users Tables --------  */}
            <Route path='/users' element={<ProtectedRoute isAuthenticated={isAuthenticated} redirect='/'>
              <Layout><UsersTables /> </Layout> </ProtectedRoute>} ></Route>

            {/* ------ Profile Page --------  */}
            <Route path='/profile' element={
              <ProtectedRoute isAuthenticated={isAuthenticated} redirect='/'>
                <Layout><Profile user={user} /></Layout></ProtectedRoute>} ></Route>

            {/* ------ Teams Page --------  */}
            <Route path='/teams' element={<ProtectedRoute isAuthenticated={isAuthenticated} redirect='/'>
              <Layout><Teams /></Layout></ProtectedRoute>} ></Route>


          </Routes>
        </Suspense>

        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
