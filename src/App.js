import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import WelcomePage from './pages/WelcomPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import { NavigationBar } from './components/NavigationBar'

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
    return (
        <>
            <NavigationBar />
            <RouterProvider router={router} />
        </>
    )
}

export default App
