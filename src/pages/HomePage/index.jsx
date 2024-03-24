import React, { useEffect, useState } from 'react'
import { getCookie, parseCookie } from '../../utils/cookies'
import { NavigationBar } from '../../components/NavigationBar'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [expenseList, getExpenseList] = useState([])

    //auth check
    useEffect(() => {
        // const cookieString = getCookie('user')

        const userFromCookie = parseCookie(getCookie('user'))
        // cookieString == '' ? null : JSON.parse(getCookie('user'))
        if (userFromCookie == null || userFromCookie?._id == null) {
            console.log('/')
            navigate('/')
        } else {
            setUserData(userFromCookie)
        }
    }, [])

    return (
        <div>
            <h1>HomePage</h1>
            {userData?._id ? <p>Name : {userData?.name}</p> : null}
            <div className="ListsDiv">
                <div className="indExpenses">
                    <ul>
                        {expenseList.map((expenseObject) => (
                            <li>expenseObject?.title</li>
                        ))}
                    </ul>
                </div>
                <div className="grpExpenses"></div>
            </div>
        </div>
    )
}
