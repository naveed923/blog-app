import logo from './logo.svg';
import './App.css';
import {Routes,Route, useNavigate} from 'react-router-dom'

import React, { useEffect, useState } from 'react'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import UpdatePost from './Components/UpdatePost';
import UpdateProfile from './Components/UpdateProfile';
import AllPost from './Components/AllPost';
import UserBlog from './Components/UserBlog';
import { database } from './Auth/FirebaseConfig';

function App() {
 
  const navigateTo=useNavigate();

 
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Dashboard' element={<Dashboard/>}>
       
        </Route>
        <Route path='/UpdatePost/:id' element={<UpdatePost/>}></Route>
        <Route path='/UpdateProfile' element={<UpdateProfile/>}></Route>
        <Route path='/ALlPost' element={<AllPost/>}></Route>
        <Route path='/UserBlog/:id' element={<UserBlog/>}></Route>
      </Routes>
    </>
  )
}

export default App


