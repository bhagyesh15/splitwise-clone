//js file to handle cookies on the website
//required functions - setcookie, getcookie, deletecookie

export const setCookie = (cname, cvalue, exdays = 1) => {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';'
}

export const getCookie = (cname) => {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return 'null'
}

export const deleteCookie = () => {
    const cookieObject = document.cookie.split(';')

    // set 1 Jan, 1970 expiry for every cookies
    for (var i = 0; i < cookieObject.length; i++)
        document.cookie =
            cookieObject[i] + '=;expires=' + new Date(0).toUTCString()
}

// Take the cookiename as parameter (cname).
// Create a variable (name) with the text to search for (cname + "=").
// Decode the cookie string, to handle cookies with special characters, e.g. '$'
// Split document.cookie on semicolons into an array called ca (ca = decodedCookie.split(';')).
// Loop through the ca array (i = 0; i < ca.length; i++), and read out each value c = ca[i]).
// If the cookie is found (c.indexOf(name) == 0), return the value of the cookie (c.substring(name.length, c.length).
// If the cookie is not found, return "".

export const parseCookie = (cookieString) => {
    return cookieString == '' ? null : JSON.parse(cookieString)
}
