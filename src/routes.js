import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DashboardView from 'src/views/dashboard/DashboardView';
import Pharmacy from 'src/views/Pharmacy/Pharmacy'
import HomeView from './views/home/HomeView';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <HomeView />},  
      { path: 'dashboard', element: <DashboardView />}, 
      { path: 'pharmacy', element: <Pharmacy />}
    ]
  }
];

export default routes;
