import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import $ from "../node_modules/jquery/dist/jquery"
import ReactDOM from 'react-dom/client';
import Dashboard from './component/dashboard';
import Login  from './component/login';
import {BrowserRouter} from 'react-router-dom'; 
import Home from './component/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
       <Dashboard></Dashboard>
       {/* <Login/> */}
       {/* <Home></Home> */}
    </BrowserRouter>
);


