import React, { useEffect, useState } from 'react'

const errorObj = {
    emailError: '',
    passwordError: '',
}

export default function Login(props) {
    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: '',
    })
    const [validationError, setValidationError] = useState({
        emailError: '',
        passwordError: '',
    })

    const handleInput = (object) => {
        setUserLoginData({
            ...userLoginData,
            ...object,
        })
    }

    const onLoginClick = () => {
        console.log('Enters')
        // Set initial error values to empty
        const { email, password } = userLoginData

        // Check if the user has entered both fields correctly
        if ('' === email) {
            setValidationError({
                ...errorObj,
                emailError: 'Please enter your email',
            })
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setValidationError({
                ...errorObj,
                emailError: 'Please enter a valid email',
            })
            return
        }

        if ('' === password) {
            setValidationError({
                ...errorObj,
                passwordError: 'Please enter a password',
            })
            return
        }

        if (password.length < 5) {
            setValidationError({
                ...errorObj,
                passwordError: 'The password must be 6 characters or longer',
            })
            return
        }

        setValidationError({
            emailError: '',
            passwordError: '',
        })

        console.log(validationError)
        props.handleLogin(userLoginData)
        // Authentication calls will be made here...
    }

    useEffect(() => {
        console.log(validationError)
    }, [validationError])

    return (
        <div className="login">
            <div>
                <div className="bodyInput">
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={userLoginData.email}
                            onChange={(e) =>
                                handleInput({ email: e.target.value })
                            }
                        />
                    </label>
                </div>
                <div className="bodyInput">
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={userLoginData.password}
                            onChange={(e) =>
                                handleInput({ password: e.target.value })
                            }
                        />
                    </label>
                </div>

                <div className="bodyInput flex justify-center">
                    <button className="btn-primary" onClick={onLoginClick}>
                        <p>Login</p>
                    </button>
                </div>
            </div>
            {/* <a>Forgot Password?</a> */}
            <p>
                New Here? {'  '}
                <button onClick={() => props.handleShowRegister(true)}>
                    Register
                </button>
            </p>
            <div>
                {Object.entries(validationError).map(([key, val]) => (
                    <p key={key}>{val}</p>
                ))}
            </div>
        </div>
    )
}
