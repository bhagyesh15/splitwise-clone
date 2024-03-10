import React, { useState } from 'react'
import './index.css'
import Login from './Login'
import Register from './Register'

export default function WelcomePage() {
    const [showRegister, setShowRegister] = useState(false)
    // const [userData, setUserData] = useState({
    //     name: '',
    //     password: '',
    //     email: '',
    //     phone: '',
    // })
    // const [verifyPassword, setVerifyPassword] = useState('');

    console.log('showRegister', showRegister)

    const handleLogin = (data) => {
        console.log('Login Button')
        console.log(data)
    }

    const handleRegister = (data) => {
        console.log('Register Button')
        console.log(data)
    }

    return (
        <div className="welcomePage">
            <div className="welcomeMessage">
                <h1>Hi Welcome to 'AppName'!</h1>
            </div>
            <div className="welcomeCard">
                {!showRegister ? (
                    <Login
                        handleLogin={handleLogin}
                        handleShowRegister={(flag) => setShowRegister(flag)}
                    />
                ) : (
                    <Register
                        hadnleRegister={handleRegister}
                        handleShowRegister={(flag) => setShowRegister(flag)}
                    />
                )}
            </div>
        </div>
    )
}
