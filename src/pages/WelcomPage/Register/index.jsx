import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const errorObj = {
    nameError: '',
    emailError: '',
    passwordError: '',
    phoneError: '',
}

export default function Register(props) {
    const navigate = useNavigate()

    const [userRegisterData, setUserRegisterData] = useState({
        name: '',
        password: '',
        vpassword: '',
        email: '',
        phone: '',
    })

    const [validationError, setValidationError] = useState({ ...errorObj })

    const handleInput = (object) => {
        setUserRegisterData({
            ...userRegisterData,
            ...object,
        })
    }

    const onRegisterClick = () => {
        console.log('Enters')
        console.log(userRegisterData)
        // Set initial error values to empty
        const { name, email, password, vpassword, phone } = userRegisterData
        setValidationError({ ...errorObj })

        // Check if the user has entered all the fields correctly
        if ('' === name || name.length < 3) {
            setValidationError({
                ...errorObj,
                nameError: 'Please enter your name with atleast 3 letters',
            })
            return
        }

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

        if (phone.length < 9 || phone.length > 11) {
            setValidationError({
                ...errorObj,
                passwordError: 'Please enter phone number with 9 to 11 digits',
            })
            return
        }

        if (password.length < 5) {
            setValidationError({
                ...errorObj,
                passwordError: 'The password must be 6 characters or more',
            })
            return
        }

        if (password != vpassword) {
            console.log(password, vpassword)
            setValidationError({
                ...errorObj,
                passwordError: 'Verify password correctly',
            })
            return
        }

        // props.handleRegister(userRegisterData)

        navigate('/home')
        // Authentication calls will be made here...
    }

    return (
        <div className="login">
            <div>
                <div className="bodyInput">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={userRegisterData.name}
                            onChange={(e) =>
                                handleInput({ name: e.target.value })
                            }
                        />
                    </label>
                </div>

                <div className="bodyInput">
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={userRegisterData.email}
                            onChange={(e) =>
                                handleInput({ email: e.target.value })
                            }
                        />
                    </label>
                </div>
                <div className="bodyInput">
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            name="phone"
                            value={userRegisterData.phone}
                            onChange={(e) =>
                                handleInput({ phone: e.target.value })
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
                            value={userRegisterData.password}
                            onChange={(e) =>
                                handleInput({ password: e.target.value })
                            }
                        />
                    </label>
                </div>

                <div className="bodyInput">
                    <label>
                        Verify Password:
                        <input
                            type="password"
                            name="vpassword"
                            value={userRegisterData.vpassword}
                            onChange={(e) =>
                                handleInput({
                                    vpassword: e.target.value,
                                })
                            }
                        />
                    </label>
                </div>

                <div className="bodyInput flex justify-center">
                    <button className="btn-primary" onClick={onRegisterClick}>
                        Register
                    </button>
                </div>
            </div>
            <p>
                Already have an account?{'  '}
                <button onClick={() => props.handleShowRegister(false)}>
                    Login
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

// export default Register
