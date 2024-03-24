import axios from 'axios'
import { BASE_URL, LOGIN_URL, REGISTER_URL, USER_URL } from '../utils/constants'

//imports not specified
export const getLoginDetails = async (userId) => {
    axios.post(BASE_URL + USER_URL + '/' + userId).then((response) => {
        console.log(response)
    })
}

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
