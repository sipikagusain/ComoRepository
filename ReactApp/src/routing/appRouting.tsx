import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserList from '../socialBladeGrid/userList';

const AppRouting = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<UserList/>}/>
        </Routes>
    </Router>
  );
}

export default AppRouting;