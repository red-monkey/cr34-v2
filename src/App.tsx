import React from "react";
import Landingpage from "./components/Landingpage";
import { Route, Link, Routes, useParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/:id" element={<Landingpage />} />
    </Routes>
  );
}

export default App;
