import React, { useEffect, useState } from 'react'
import './index.css'
import { getCookie, parseCookie } from '../../utils/cookies'
import { NavigationBar } from '../../components/NavigationBar'
import { useNavigate } from 'react-router-dom'
import {
    getExpensesList,
    getFriendConnectionsList,
    getGroupConnectionsList,
} from '../../services/homeService'
import ListComponent from '../../components/ListComponent'

const demoList = [
    { _id: '1', title: 'Gas', amount: 30 },
    { _id: '2', title: 'Petrol', amount: 300 },
    { _id: '3', title: 'Trip', amount: 3000 },
]

export default function HomePage() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [expenseList, setExpenseList] = useState([])
    const [friendConnectionsList, setFriendConnectionsList] = useState([])
    const [groupConnectionsList, setGroupConnectionsList] = useState([])

    const callExpenseList = async () => {
        const response = await getExpensesList()
        if (response && response?.status == 200) {
            console.log('Expense')
            console.log(response)
            // setExpenseList([...response.data])
            setExpenseList([...response.data])
        } else {
            console.log('handle useEffect errors')
        }
    }

    const callFriendConnectionsList = async (id) => {
        const response = await getFriendConnectionsList(id)
        if (response && response?.status == 200) {
            console.log('Friend')
            console.log(response)
            // setExpenseList([...response.data])
            setFriendConnectionsList([...response.data])
        } else {
            console.log('handle useEffect errors')
        }
    }

    const callGroupConnectionsList = async (id) => {
        const response = await getGroupConnectionsList(id)
        if (response && response?.status == 200) {
            console.log('Friend')
            console.log(response)
            // setExpenseList([...response.data])
            setFriendConnectionsList([...response.data])
        } else {
            console.log('handle useEffect errors')
        }
    }

    //auth check
    useEffect(() => {
        // const cookieString = getCookie('user')

        const userFromCookie = parseCookie(getCookie('user'))
        // cookieString == '' ? null : JSON.parse(getCookie('user'))
        if (userFromCookie == null || userFromCookie?._id == null) {
            console.log('/')
            navigate('/')
        } else {
            console.log('here')
            setUserData(userFromCookie)
            callExpenseList()
            callFriendConnectionsList(userFromCookie?._id)
            callGroupConnectionsList(userFromCookie?._id)
        }
    }, [])

    return (
        <div className="HomePageDiv mainComponent">
            <div className="flex justify-between leading-1">
                {userData?._id ? (
                    <p className="md:text-2xl sm:text-lg">
                        Whereas recognition Welcome{' '}
                        <a className="font-bold">{userData?.name}</a>
                    </p>
                ) : null}
                <p className="md:text-xl sm:text-lg  align-middle">
                    you get back{' '}
                    <strong className="md:text-2xl sm:text-lg text-emerald-600 align-middle">
                        ₹500
                    </strong>
                </p>
            </div>
            <div className="ListsDiv mt-6">
                <div className=" flex  divide-x-2 divide-slate-700 bg-slate-100 border-b-2 border-slate-500">
                    <button className="px-4 py-1 hover:bg-indigo-100 hover:cursor-pointer active:bg-indigo-200">
                        Friends
                    </button>
                    <button className="table-heading">Groups</button>
                    <button className="px-4 py-1 ">History</button>
                </div>
                <div>
                    <table className="w-[100%]" id="friendsTable">
                        <thead>
                            <tr>
                                <th className="text-left">Name</th>
                                <th className="text-left">Amount</th>
                                <th className="text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="flex align-middle">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt="photoIcon"
                                    />
                                    <p className="mx-auto">Tanya</p>
                                </td>
                                <td>₹50</td>
                                <td className="flex justify-end">
                                    <button>Add</button>
                                    <button>Settle</button>
                                    <button>More</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Tanishq</td>
                                <td>₹105</td>
                            </tr>
                            <tr>
                                <td>Kushgra</td>
                                <td>₹650</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="w-[100%]" id="groupsTable">
                        <thead>
                            <tr>
                                <th>Group Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>KTBD</td>
                                <td>₹50</td>
                            </tr>
                            <tr>
                                <td>OLC</td>
                                <td>₹105</td>
                            </tr>
                            <tr>
                                <td>Weekending</td>
                                <td>₹650</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="w-[100%]" id="friendsTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Tanya</td>
                                <td>₹50</td>
                            </tr>
                            <tr>
                                <td>Tanishq</td>
                                <td>₹105</td>
                            </tr>
                            <tr>
                                <td>Kushgra</td>
                                <td>₹650</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <ListComponent
                    listTitle="Friends"
                    listArray={friendConnectionsList}
                    className="pr-2"
                />
                <ListComponent
                    listTitle="Groups"
                    listArray={groupConnectionsList}
                    className="pl-2"
                /> */}
            </div>
        </div>
    )
}
