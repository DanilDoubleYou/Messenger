import { useState, useEffect, useCallback } from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserID] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login = useCallback((jwtToken, id) => { 
        setUserID(id)
        setToken(jwtToken)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, [])

    const logout = () => {     
        setUserID(null)
        setToken(null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if(data && data.token && data.userId) {
            login(data.token, data.userId)
        }
        setIsReady(true)
    }, [login])

    return {login, logout, token, userId, isReady}
}