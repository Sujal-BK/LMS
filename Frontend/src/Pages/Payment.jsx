import React, { useEffect, useState } from 'react'
import api from '../../api/axios'


const Payment = () => {
    const [orderId,setOrderId] = useState('')

    const amount = 500;
    const currency = "INR"
    const receiptId = '3478180'

    const paymentHandler = async()=>{
        try {
            const {data} = await api.post('/cart/createOrder',{
              
                    amount,
                    currency, 
                    receipt : receiptId
                
            })
            console.log(data);
            setOrderId(data.order_id)

            let options = {
                key :import.meta.env.VITE_RAZORPAY_KEY,
                amount,
                currency,
                name :"LMS",
                description:"Test Transaction",
                
                order_id : orderId,
                handler : async function(res){
                    alert('Transaction Successfull')
                }
            }
            var rzp1 = new Razorpay(options)
            rzp1.on("payment.failed",function(res){
                alert("Transaction Failed")
            })

            rzp1.open()
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        paymentHandler()
    },[])
   
 
}

export default Payment