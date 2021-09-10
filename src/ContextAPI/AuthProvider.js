// import { Spin } from "antd";
import { Spin } from "antd";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { auth } from "../Firebase/config";

export const AuthContext = React.createContext()
export default function AuthProvider({children}){
    const history = useHistory()
    const [user, setUser] = useState({})
    const [isloading, setIsloading] = useState(true)
    React.useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const { displayName, email, uid, photoURL } = user
          setUser({
            displayName, email, uid, photoURL,
          })
          setIsloading(false)
          history.push('/')
          return
        }
          setIsloading(false)
          history.push('/login')
      })
      //clean function
      return () => {
        unsubscribe() 
      }
    }, [history])
    return (
      <AuthContext.Provider value={{ user }}>
        {isloading ? <Spin /> : children}
      </AuthContext.Provider>
    )
}