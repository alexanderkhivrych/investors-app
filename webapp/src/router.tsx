import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { InvestorList } from './components/investor-list';
import { InvestorDetails } from './components/investor-details';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <InvestorList />,
  },
  {
    path: '/investors/:id',
    element: <InvestorDetails />,
  },
]);
