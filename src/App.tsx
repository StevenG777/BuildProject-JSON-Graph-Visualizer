// 1. Weather API
// 2. Material UI, Tailwind CSS, Chart.js, D3.js, Cytoscape.js

import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './App.css';
import Navigation from './Components/Navigation';
import HomePage from './Components/HomePage';
import JSONRenderPage from './Components/JSONRenderPage';
import ErrorPage from './Components/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: < Navigation />,
    errorElement: < ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/json-render",
        element: <JSONRenderPage />,
      },
    ],
  }
]);

const App: React.FC = () => {
  // Return App element includes Navigation element includes children elements HomePage & JSONRenderPage
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
