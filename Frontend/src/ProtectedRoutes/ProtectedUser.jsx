import React from 'react'
import useAuth from '../Store/useAuth'
import { Outlet } from 'react-router-dom'

const ProtectedUser = () => {
    const {role} = useAuth()

    if(role==="User"){
        return <Outlet/>
    }
  return (
    <div>User Not Found</div>
  )
}

export default ProtectedUser