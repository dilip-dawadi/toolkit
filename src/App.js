import React from "react"
import FoodView from './features/displayFood/foodView'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Container maxWidth='xl' >
          <Routes>
            <Route path="/home" element={<FoodView />} />
            <Route path="/" exact element={<Navigate to="/home" />} />
          </Routes>
        </Container>
      </React.StrictMode>
    </BrowserRouter>
  )
}

export default App