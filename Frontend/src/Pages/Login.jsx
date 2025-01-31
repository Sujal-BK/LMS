import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import useAuth from '../Store/useAuth'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   

    const navigate = useNavigate()

    const {storeTokenInLS} = useAuth()
    

     
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post('/auth/sign-in', {
               
                email,
                password,
              
            })
            storeTokenInLS(data.token,data.role)
            toast.success('Login Successfully')
             navigate('/')
           
            setEmail('')
            setPassword('')
            


        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Login failed. Please try again later.');
            }
        }
    }

    return (
        <Layout>
            <div className='flex flex-col items-center h-screen'>
                <h1 className='text-4xl font-serif mt-9'>Log in to continue your learning journey </h1>
                <div>
                    <form className='flex flex-col mt-7'
                        onSubmit={handleSubmit}
                    >
                        
                        <div>
                            <input
                                type="text"
                                placeholder='Email'
                                className='outline-none p-3 border rounded-md w-[350px] border-black m-2'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder='Password'
                                className='outline-none p-3 border rounded-md w-[350px] border-black m-2'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Link className='mx-2' to='/forgot-password'>Forgot password?</Link>
                        </div>
                       
                        <div>
                            <input
                                type="submit"

                                className='p-3 text-zinc-200 rounded-md w-[350px] border-black m-2 bg-blue-600 hover:bg-blue-500'
                            />
                        </div>
                        <div className='mx-2'> Don't have an account? <span><Link to='/sign-up'>Sign up</Link></span></div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login