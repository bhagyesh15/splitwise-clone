import axios from 'axios'
import {
    BASE_URL,
    EXPENSES_URL,
    LOGIN_URL,
    REGISTER_URL,
} from '../utils/constants'

export const doPostLogin = async (userData) => {
    // new Promise((resolve,reject))
    const result = await axios
        .post(BASE_URL + LOGIN_URL, {
            ...userData,
        })
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((err) => {
            console.log(err.response)
            return err.response
        })
    return result
}

export const doPostRegister = async (userData) => {
    console.log('before')
    const result = await axios
        .post(BASE_URL + REGISTER_URL, {
            ...userData,
        })
        .then((response) => {
            console.log('then')
            return response
        })
        .catch((err) => {
            console.log('err')
            console.log(err)
            return err.response
        })
    return result
}

//imports not specified
export const getExpensesList = async () => {
    const result = await axios
        .get(BASE_URL + EXPENSES_URL)
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((err) => {
            console.log(err.response)
            return err.response
        })

    return result
}

// /connections/ind/:userid
export const getFriendConnectionsList = async (userid) => {
    console.log('getFriendConnectionsList')
    const result = await axios
        .get(BASE_URL + '/connections/ind/' + userid)
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((err) => {
            console.log(err.response)
            return err.response
        })

    return result
}

// /connections/ind/:userid
export const getGroupConnectionsList = async (userid) => {
    console.log('getGroupConnectionsList')
    const result = await axios
        .get(BASE_URL + '/connections/group/' + userid)
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((err) => {
            console.log(err.response)
            return err.response
        })

    return result
}
