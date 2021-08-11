import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DashboardView from 'src/views/dashboard/DashboardView';
import Pharmacy from 'src/views/Pharmacy/Pharmacy';
import HomeView from './views/home/HomeView';
import Accounts from './views/Accounts/Accounts';
import Inventory from './views/Inventory/Inventory';
import Laboratory from './views/Laboratory/Laboratory';
import Maternity from './views/Maternity/Maternity';
import MchStore from './views/MCHStore/MchStore';
import Mchclinic from './views/MCHClinic/Mchclinic';
import Login from './views/Authentication/Login';
import Visits from './views/Visists/Visits';

const routes = [
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      // { path: '/', element: <HomeView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'pharmacy', element: <Pharmacy /> },
      { path: 'accounts', element: <Accounts /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'laboratory', element: <Laboratory /> },
      { path: 'maternity', element: <Maternity /> },
      { path: 'mchclinic', element: <Mchclinic /> },
      { path: 'mchstores', element: <MchStore /> },
      { path: 'visits', element: <Visits /> },
      
    ]
  },
  {
    path: '/',
    element: <Login />
  }
];

export default routes;
