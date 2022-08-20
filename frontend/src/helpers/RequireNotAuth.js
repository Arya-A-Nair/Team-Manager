import React,{useContext} from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContextsPovider'

export const RequireNotAuth = () => {
    const {isAuthenticated}=useContext(AuthContext)
    if(isAuthenticated===null){
        return <div>Loading...</div>
    }
    if(isAuthenticated===true){
        return <Navigate to="/"/>
    }


  return (
    <Outlet/>
  )
}
