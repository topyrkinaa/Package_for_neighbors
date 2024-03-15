import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';
import Home from './components/home/Home';
import PrivateRoute from './utils/router/privateRoute';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import Recovery from './components/auth/recovery/Recovery';
import Navbar from './components/navbar/navbar';
import HomeChat from './components/chat/HomeChat';
import Reference from './components/reference/Reference';



const App = (props: any) => {
  const { isAuth } = props;

    return (
      <div className="App">
        <Navbar/>
        <Routes>
          
          <Route
          path="/chat"
          element={isAuth ? <HomeChat/> : <Navigate to="/login" replace/>}
          />

          <Route path="/" element={<Home />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recovery" element={<Recovery />} />
          
        </Routes>
     </div>
  
    );
}

export default connect(({ user }) => ({ isAuth: user.isAuth}))(App);
