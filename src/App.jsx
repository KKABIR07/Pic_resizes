import React from 'react';
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ImageResizer from './page/ImageResizer';


const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<ImageResizer/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
