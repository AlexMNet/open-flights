import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Airlines from './Airlines/Airlines.jsx'
import Airline from './Airline/Airline'

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Airlines />} />
      <Route exact path="/airlines/:slug" element={<Airline />} />
    </Routes>
  )
}

export default App
