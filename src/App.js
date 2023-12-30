import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/homePage/homepage.component";
import LoginPage from "./pages/loginpage/loginpage.component";

function App() {
  let navigate = useNavigate();
  // ckeck for user loged in
  const isLogedIn = useSelector((state) => state.user.isLogedIn);
  useEffect(() => {
    console.log(isLogedIn);
  }, [isLogedIn, navigate]);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* private rout : if user is loged in has access to this routs  */}
      {/* <Route element={<Privateroute isLogedIn={isLogedIn} />}> */}
      {/* <Route element={<LayoutTop />}> */}
      <Route path="/Home" element={<Home />} />
      {/* </Route> */}
      {/* </Route> */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
