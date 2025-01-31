import React from 'react'
import useAuth from '../Store/useAuth'
import { Outlet } from 'react-router-dom'
const ProtectedMentor = () => {

    const { role } = useAuth()
    if (role === "Mentor") {
        return <Outlet />
    }

    return (
        <h1>Mentor Not Found</h1>
    )
}

export default ProtectedMentor