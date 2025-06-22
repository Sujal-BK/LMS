import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Plans from './Plans';
const Home = () => {
  const [currentIdx,setCurrentIdx] = useState(0)
 
  const slides = [
    {
      url: "https://img-c.udemycdn.com/notices/web_carousel_slide/image/e6cc1a30-2dec-4dc5-b0f2-c5b656909d5b.jpg",
    },
    {
      url: "https://img-c.udemycdn.com/notices/web_carousel_slide/image/10ca89f6-811b-400e-983b-32c5cd76725a.jpg"
    }

  ]
  const quatos = [
    {
      q:"Skills for your present (and your future). Get started with us."
    },{
      q:"Technology and the world of work change fast — with us, you’re faster. Get the skills to achieve goals and stay competitive."
    }
  ]
  const prevSlide = () =>{
    const isFirstSlide = currentIdx ===0;
    const newSlide = isFirstSlide ? slides.length-1 : currentIdx -1;
    setCurrentIdx(newSlide);
  }
  const nextSlide = () =>{
    const isLastSlide = currentIdx===slides.length-1;
    const nextSlide = isLastSlide ? 0:currentIdx+1;
    setCurrentIdx(nextSlide)
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      nextSlide()
    },2000)

    return ()=> clearInterval(interval)
  },[currentIdx])

  

  
  return (
  
      <div>
        <div className='w-full   md:max-w-[1400px] h-[400px] mx-auto  '>
          <div style={{backgroundImage:`url(${slides[currentIdx].url})`}}
          className={`md:w-full h-full -my-3 flex bg-contain bg-no-repeat md:bg-cover ` }
          >
          
          
            <div className='flex text-white text-2xl'>
            <button
            onClick={()=>prevSlide()}
            className='bg-zinc-800 h-fit rounded-full translate-y-12 md:translate-y-40 md:translate-x-1 '><FaAngleLeft/></button>
            <button
            onClick={()=>nextSlide()}
            className='bg-zinc-800 h-fit rounded-full translate-y-12 md:translate-y-40 translate-x-[360px] md:translate-x-[1300px]'><FaAngleRight/></button>
            </div>
         
          </div>
        </div>
        <div className='m-4'>
          <h2 className='font-semibold font-serif text-3xl '>All the skills you need in one place</h2>
          <p className='font-[Poppins] text-zinc-500 animate-pulse'>From critical skills to technical topics, Udemy supports your professional development.</p>
        </div>
        <div className='hidden md:flex m-4 text-xl font-semibold text-zinc-600   gap-5'>
          <Link className='hover:text-zinc-900 active:text-black'>Data Science</Link>
          <Link className='hover:text-zinc-900'>IT Certifications</Link>
          <Link className='hover:text-zinc-900'>Leadership</Link>
          <Link className='hover:text-zinc-900'>Web Development</Link>
          <Link className='hover:text-zinc-900'>Communication</Link>
          <Link className='hover:text-zinc-900'>Business Anaiytics & Intelligence</Link>
        </div>
      <hr  className='mx-4 '/>
      <Plans/>
      </div>
    
  )
}

export default Home