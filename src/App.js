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
        <div className="appjs">
            <NavigationBar />
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <RouterProvider router={router} />
            </div>
        </div>
    )
}

export default App
