import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../screens/Home";
import { Topic } from "../screens/Topic";
import { Register } from "../screens/Register";
import { Login } from "../screens/Login";

export function Routers() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/topic/:slug" element={< Topic />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}