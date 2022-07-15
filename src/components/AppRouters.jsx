import React from "react";
import { Routes } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import {Route} from  'react-router-dom';
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import { routes } from "../router";

const AppRouters = () => {
    return (
        <Routes>
            {routes.map(route => {
                <Route component={route.component} path={}/>
            })}
        <Route path="/" element={<About/>} />
        <Route exact path="posts" element={<Posts/>} />
        <Route exact path="/posts/:id" element={<PostIdPage/>} />
        <Route path="*" element={<Error/>} />

        
      </Routes>
    )
};

export default AppRouters;