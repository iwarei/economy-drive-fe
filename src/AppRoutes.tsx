import React from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouteAuthGuard } from './RouteAuthGuard';
import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { ErrorPage } from './components/pages/ErrorPage';
import { ForgotPassword } from './components/pages/ForgotPassword';
import { ResetPassword } from './components/pages/ResetPassword';
import { Account } from './components/pages/Account';
import { NotifyPointMaster } from './components/pages/NotifyPointMaster';
import { WardMaster } from './components/pages/master/WardMaster/WardMaster';
import { LineMaster } from './components/pages/master/LineMaster/LineMaster';
import { TrainTypeMaster } from './components/pages/master/TrainTypeMaster/TrainTypeMaster';

const AppRoutes = () => {
  axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
            <RouteAuthGuard>
              <Home />
            </RouteAuthGuard>
          }
        />
        <Route
          path="/master/line"
          element={
            <RouteAuthGuard>
              <LineMaster />
            </RouteAuthGuard>
          }
        />
        <Route
          path="/master/ward"
          element={
            <RouteAuthGuard>
              <WardMaster />
            </RouteAuthGuard>
          }
        />
        <Route
          path="/master/train-type"
          element={
            <RouteAuthGuard>
              <TrainTypeMaster />
            </RouteAuthGuard>
          }
        />
        <Route path="notify-point-master" element={<NotifyPointMaster />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="password-reset/*" element={<ResetPassword />} />
        <Route
          path="account"
          element={
            <RouteAuthGuard>
              <Account />
            </RouteAuthGuard>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
