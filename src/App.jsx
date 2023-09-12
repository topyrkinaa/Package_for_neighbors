import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import PrivateRoute from './utils/router/privateRoute';
import AuthRootComponents from './components/auth/AuthRoot';
import Register from './components/auth/register/Register';
import Recovery from './components/auth/recovery/Recovery';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="login" element={<AuthRootComponents />} />
        <Route path="register" element={<Register />} />
        <Route path="recovery" element={<Recovery />} />
      </Routes>
    </div>
  );
}

export default App;
