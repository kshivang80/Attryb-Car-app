import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../Components/Home';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import PostCar from '../Components/PostCar';


const AllRoutes = () => {

    return (

        <div>
            <Routes>

                <Route path="/" element={<Home />}></Route>

                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/postdata" element={<PostCar/>}></Route>
               
            </Routes>
        </div>
    )
}

export default AllRoutes