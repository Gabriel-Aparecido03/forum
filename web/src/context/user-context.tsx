import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

type User = {
  username: string
  email: string
  id : string
}

export interface UserContextType {
  user: User | null
  makeLogin: (email: string, password: string) => Promise<void>
  makeLogout: () => Promise<void>
}

interface UserContextProvider {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProvider) {

  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  async function makeLogin(email: string, password: string) {
    try {
      const res = await api.post('/session/authenticate', {
        email,
        password
      })
      saveTokenAtCookies(res.data.access_token)
      await gettingUserInfo()
    } catch (error) {
      console.log(error)
    }
  }

  async function gettingUserInfo() {
    try {
      const res = await api.get('/session/me')
      
      if(res.status === 200 ) {
        setUser({
          email: res.data.email,
          username: res.data.username,
          id : res.data.id
        })
        navigate('/home')
      }
      else setUser(null)
    } catch (error) { console.log(error) }
  }

  async function makeLogout() {
    removeTokenAtCookie()
    setUser(null)
    navigate('/')
  }

  function saveTokenAtCookies(token: string) {
    Cookies.set('token', token, { expires: 1, secure: true });
  }

  function removeTokenAtCookie() {
    Cookies.remove('token')
  }

  useEffect(() => {
    gettingUserInfo()
  }, [])

  return (
    <UserContext.Provider value={{ makeLogin, makeLogout, user }}>
      {children}
    </UserContext.Provider>
  )
}