import React, { useEffect, useState } from 'react'
import './index.css'
import Login from './Login'
import Register from './Register'
import { doPostLogin, doPostRegister } from '../../services/loginService'
import { useNavigate } from 'react-router-dom'
import { getCookie, parseCookie, setCookie } from '../../utils/cookies'
import { NavigationBar } from '../../components/NavigationBar'

export default function WelcomePage() {
    const navigate = useNavigate()

    const [showRegister, setShowRegister] = useState(false)
    const [userData, setUserData] = useState({})
    // const [userData, setUserData] = useState({
    //     name: '',
    //     password: '',
    //     email: '',
    //     phone: '',
    // })
    // const [verifyPassword, setVerifyPassword] = useState('');

    console.log('showRegister', showRegister)

    const handleLogin = async (data) => {
        console.log('Login Button')
        // console.log(data)

        const response = await doPostLogin(data)
        console.log('response')
        console.log(response)
        if (response?.status == 200) {
            console.log(response.status)
            setUserData(response.data)
        }

        //else handle errors
    }

    const handleRegister = async (data) => {
        console.log('Register Button')
        console.log(data)

        const response = await doPostRegister(data)
        console.log(response)
        if (response?.status == 200) {
            console.log(response.status)
            setUserData(response.data)
        } else {
            console.log('else')
        }
        //else handle errors
    }

    useEffect(() => {
        if (userData?._id != null) {
            setCookie('user', JSON.stringify(userData))
            navigate('/home')
        }
    }, [userData])

    useEffect(() => {
        const cookieUserData = parseCookie(getCookie('user'))
        if (cookieUserData?._id != null) {
            navigate('/home')
        }
    }, [])

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
                        handleRegister={handleRegister}
                        handleShowRegister={(flag) => setShowRegister(flag)}
                    />
                )}
                {userData?.name ? (
                    <div>
                        <p>
                            Hello
                            {userData.name}!
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
