import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Farms from "./pages/Farms";
import DigitalTwin from "./pages/DigitalTwin";
import CropHealth from "./pages/CropHealth";
import Soil from "./pages/Soil";
import IrrigationPage from "./pages/IrrigationPage";
import Weather from "./pages/Weather";
import AIAssistantPage from "./pages/AIAssistantPage";
import Predictions from "./pages/Predictions";
import AlertsPage from "./pages/AlertsPage";
import GoogleCallback from "./pages/GoogleCallback";
import ProtectedRoute from "./components/route/ProtectedRoute";
import PublicRoute from "./components/route/PublicRoute";
import FieldsPage from "./pages/FieldsPage";
import DigitalTwin2 from "./pages/DigitalTwin2";
import ShowDigitalTwin from "./pages/ShowDigitalTwin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<PublicRoute />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/google-callback"
          element={<GoogleCallback />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/farms"
            element={<Farms />}
          />

          <Route
            path="/fields"
            element={<FieldsPage />}
          />

          {/* <Route
            path="/digital-twin"
            element={<DigitalTwin />}
          /> */}

          <Route
            path="/digital-twin/add-digital-twin"
            element={<DigitalTwin2 />}
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
            element={<Weather />}
          />

          <Route
            path="/ai-assistant"
            element={<AIAssistantPage />}
          />

          <Route
            path="/predictions"
            element={<Predictions />}
          />

          <Route
            path="/irrigation"
            element={<IrrigationPage />}
          />

          <Route
            path="/alerts"
            element={<AlertsPage />}
          />
        </Route>
        <Route
          path="/digital-twin"
          element={<ShowDigitalTwin />}
        />
      
      </Route>

    </Routes>
  );
};

export default App;