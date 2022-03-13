import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';

export default function App(){
  return(
   <BrowserRouter>
    <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>
     </Routes>
  </BrowserRouter>

  );
}