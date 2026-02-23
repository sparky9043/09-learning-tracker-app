import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import Homepage from './components/HomePage/Homepage'
import Login from './components/LoginPage/Login'
import Dashboard from './components/DashboardPage/Dashboard'
import Protected from './components/ProtectedRoute/Protected'
import Summary from './components/SummaryPage/Summary'
// import Summary from './components/SummaryPage/Summary'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      Component: Homepage,
    }, {
      path: '/login',
      Component: Login,
    }, {
      Component: Protected,
      children: [
        {
          path: '/dashboard',
          Component: Outlet,
          children: [
            {
              Component: Dashboard,
              index: true,
            },
            {
              Component: Summary,
              path: 'summarize',
            }
          ]
        },
      ]
    },
  ]);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
