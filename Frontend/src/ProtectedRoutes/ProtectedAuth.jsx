import React from 'react'
import useAuth from '../Store/useAuth'
import { Outlet } from 'react-router-dom'
const ProtectedAuth = () => {
    const { isLoggedIn } = useAuth()
    if (isLoggedIn) {
        return <h1 className='font-[Poppins] text-5xl m-4 p-4'>Oops! Your are already Logged in</h1>
    }
    return (
        <Outlet />
    )
}

export default ProtectedAuth