import React from 'react';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DashboardView from 'src/views/dashboard/DashboardView';
import Test from 'src/components/Test/Test'

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardView />},
      {path : 'test',element: <Test />}
    ]
  }
];

export default routes;
