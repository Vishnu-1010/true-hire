import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "../pages/public/Home";
const AllRoutes = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' element= {<Home/>}>Home</Route>
      </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default AllRoutes
