import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState(null)

  const login = useCallback((jwtToken, id, username) => {
    setToken(jwtToken)
    setUserId(id)
    setUserName(username)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, userName: username, bliat: 11111
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUserName(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.userName)
    }
    setReady(true)
  }, [login])


  return { login, logout, token, userId, ready, userName}
}