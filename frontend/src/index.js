import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createTheme, MantineProvider, Box } from "@mantine/core";
import "@mantine/core/styles.css";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import LandingPage from "screens/LandingPage/LandingPage";
import RegisterPage from "screens/RegisterPage/RegisterPage";
import ProfilePage from "screens/ProfilePage/ProfilePage";
import LoginPage from "screens/LoginPage/LoginPage";
import ForgotPasswordPage from "screens/ForgotPasswordPage/ForgotPasswordPage";
import AcceptGoogleAuth from "screens/AcceptGoogleAuth/AcceptGoogleAuth";
import ResetPasswordPage from "screens/ResetPasswordPage/ResetPasswordPage";
import TerraBoard from "screens/Board";
import Index from "screens";

const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route
            path="/forgot-password/:email"
            element={<ForgotPasswordPage />}
          />
          <Route path="/accept-google-auth" element={<AcceptGoogleAuth />} />
          <Route
            path="/reset-password/:email"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/board"
            element={
              <Box id="board">
                <TerraBoard />
              </Box>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
