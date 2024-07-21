import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminSignUp from './pages/Admin/AdminSignUp';
import UserSignUp from './pages/User/UserSignUp';
import LandingPage from './pages/LandingPage';
import UserLogin from './pages/User/UserLogin';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminListEvent from './pages/Admin/AdminListEvents';
import CreateEvent from './pages/Admin/CreateEvent';
import EditEvent from './pages/Admin/EditEvent';
import UserDashboard from './pages/User/UserDashboard';
import UserListEvents from './pages/User/UserListEvents';
import EventDetails from './pages/User/EventDetails';

function App() {
  const router = createBrowserRouter([
    {
      index: true,
      element: <LandingPage />,
    },
    {
      path: 'admin',
      children: [
        {
          path: 'dashboard',
          element: <AdminDashboard />,
          children: [
            {
              index: true,
              element: <AdminListEvent />,
            },
            {
              path: 'events',
              children: [
                {
                  path: 'create',
                  element: <CreateEvent />,
                },
                {
                  path: 'edit/:id',
                  element: <EditEvent />,
                },
              ],
            },
          ],
        },
        {
          path: 'login',
          element: <AdminLogin />,
        },
        {
          path: 'signup',
          element: <AdminSignUp />,
        },
      ],
    },
    {
      path: 'user',
      children: [
        {
          path: 'dashboard',
          element: <UserDashboard />,
          children: [
            {
              index: true,
              element: <UserListEvents />,
            },
            {
              path: 'event',
              children: [
                {
                  path: ':id',
                  element: <EventDetails />,
                },
              ],
            },
          ],
        },
        {
          path: 'login',
          element: <UserLogin />,
        },
        {
          path: 'signup',
          element: <UserSignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
