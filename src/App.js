import logo from './logo.svg'
import './App.css'
import {
    BrowserRouter,
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
} from 'react-router-dom'
import WelcomePage from './pages/WelcomPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import NoPage from './pages/NoPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <WelcomePage />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    {
        path: '/profile',
        element: <ProfilePage />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
