import React from "react";
import './styles/App.css';

import {BrowserRouter} from  'react-router-dom';
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouters from "./components/AppRouters";

function App() {
  
    return (
    <BrowserRouter>
      
      <Navbar/>
      <AppRouters/>

    </BrowserRouter>
  )
};

export default App;