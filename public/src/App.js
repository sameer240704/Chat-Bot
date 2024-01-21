import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Main from "./pages/main";
import Avatar from "./pages/setAvatar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/avatar" element={<Avatar />} />
        <Route exact path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}