import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import api from '../../api/axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const DeleteCourse = () => {

    const {courseId} = useParams()
    const navigate = useNavigate()
    const deleteCourse  =async()=>{
        try {
          const {data} =   await api.delete(`/course/delete-course/${courseId}`)
            toast.success(data.message)
            navigate('/mentor')
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
    useEffect(()=>{
       deleteCourse()
    },[courseId])
 
}

export default DeleteCourse