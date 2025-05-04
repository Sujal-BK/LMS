import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [photo, setPhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

       

        try {
            const { data } = await api.post('/auth/sign-up',{
                username,
                email,
                password,
                role,photo
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Sign Up Successfully');
            navigate('/sign-in');
            // Reset form fields
            setEmail('');
            setPassword('');
            setRole('');
            setUsername('');
            setPhoto(null);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Sign Up failed. Please try again later.');
            }
        }
    };

    return (
        <Layout>
            <div className='flex flex-col items-center h-screen'>
                <h1 className='text-4xl font-serif mt-9'>Sign up and start learning</h1>
                <div>
                    <form className='flex flex-col mt-7' onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder='Username'
                                className='outline-none p-3 border rounded-md w-[350px] border-black m-2'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="email" // Change to email type for better validation
                                placeholder='Email'
                                className='outline-none p-3 border rounded-md w-[350px] border-black m-2'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password" // Change to password type for security
                                placeholder='Password'
                                className='outline-none p-3 border rounded-md w-[350px] border-black m-2'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='flex mt-4 m-2 text-xl gap-2 items-center'>
                            <div>Role:</div>
                            <input
                                type="radio"
                                value="User"
                                name='role'
                                onChange={(e) => setRole(e.target.value)} /> User
                            <input
                                type="radio"
                                value="Mentor"
                                name='role'
                                onChange={(e) => setRole(e.target.value)} /> Mentor
                        </div>
                        <div>
                            <input
                                type="file"
                                className='outline-none p-3 border rounded-md w-[350px] border-black m-2'
                                onChange={(e) => setPhoto(e.target.files[0])} // Set the selected file
                            />
                        </div>
                        <div>
                            <input
                                type="submit"
                                className='p-3 text-zinc-200 rounded-md w-[350px] border-black m-2 bg-blue-600 hover:bg-blue-500'
                            />
                        </div>
                        <div className='mx-2'> Already signed up? <span><Link to='/sign-in'>Login</Link></span></div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Signup;