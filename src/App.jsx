import React from 'react';
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ImageResizer from './page/ImageResizer';
import FileTransfer from './page/Filetransfer';


const App = () => {
  return (
    <div>
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<ImageResizer/>}/>
        <Route path='/file' element={<FileTransfer/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
