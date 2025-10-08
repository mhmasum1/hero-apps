import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './components/Home/Home.jsx';
import Apps from './components/Apps/Apps.jsx';
import Installation from './components/Installation/Installation.jsx';
import AppDetails from './components/AppDetails/AppDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: '/apps',
        element: <Apps></Apps>
      },
      {
        path: "/apps/:id",
        element: <AppDetails></AppDetails>
      },
      {
        path: '/installation',
        element: <Installation></Installation>
      },

    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
