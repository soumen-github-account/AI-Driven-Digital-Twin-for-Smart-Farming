import React from 'react'
import { Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import Farms from './pages/Farms'
import DigitalTwin from './pages/DigitalTwin'
import CropHealth from './pages/CropHealth'
import Soil from './pages/Soil'
import IrrigationPage from './pages/IrrigationPage'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route element={<Layout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/fields"
            element={<div>Field</div>}
          />

          <Route
            path="/digital-twin"
            element={<DigitalTwin />}
          />
          
          <Route
            path="/digital-twin"
            element={<DigitalTwin />}
          />

          <Route
            path="/crop-health"
            element={<CropHealth />}
          />

          <Route
            path="/soil"
            element={<Soil />}
          />

          <Route
            path="/weather"
            element={<DigitalTwin />}
          />

          <Route
            path="/irrigation"
            element={<IrrigationPage />}
          />


        </Route>

      </Routes>
    </div>
  )
}

export default App
