import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import PrivateRoute from './utils/router/privateRoute';
import AuthRootComponents from './components/auth/AuthRoot';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="login" element={<AuthRootComponents />} />
        <Route path="register" element={<AuthRootComponents />} />
        <Route path="recovery" element={<AuthRootComponents />} />
      </Routes>
    </div>
  );
}

export default App;
