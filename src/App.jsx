import { Routes, Route } from "react-router-dom"
import "./App.css"

import HomePage from "./pages/HomePage"

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<div>Checkout Page</div>} />
    </Routes>
  )
}

export default App
