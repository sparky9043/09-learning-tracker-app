import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'
import './App.css'
import Homepage from './components/HomePage/Homepage'
import Login from './components/LoginPage/Login'
import Dashboard from './components/DashboardPage/Dashboard'
import Protected from './components/ProtectedRoute/Protected'
import Summary from './components/SummaryPage/Summary'
import AIAssistantPage from './components/AIAssistantPage/AIAssistantPage'
import BoilerplateOutput from './components/misc/BoilerplateOutput'
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
          Component: BoilerplateOutput,
          children: [
            {
              Component: Dashboard,
              index: true,
            },
            {
              Component: Summary,
              path: 'summarize',
            },
            {
              Component: AIAssistantPage,
              path: 'ai-assistant',
            },
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
