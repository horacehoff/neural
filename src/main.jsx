import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import QueryResults from "./QueryResults.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Navbar/>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/learn/:query" element={<QueryResults/>}/>
            {/*<Route path="/credits" element={<Credits/>}/>*/}
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
