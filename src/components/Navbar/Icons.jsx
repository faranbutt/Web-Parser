import React from 'react'
import {BsGithub} from 'react-icons/bs'
import {AiFillFacebook} from 'react-icons/ai'
import {FaHackerNewsSquare} from 'react-icons/fa'
export default function Icons() {
  return (
    <div className='flex gap-3'>

        <AiFillFacebook className='h-10 w-10 hover:bg-white text-blue-500 rounded-full p-1'/>
        <FaHackerNewsSquare className='h-10 w-10 hover:bg-white text-orange-500 rounded-full p-1'/>
        
        <a href="https://github.com/faranbutt/Web-Parser"><BsGithub className='h-10 w-10 text-gray-600 hover:bg-white rounded-full p-1'/></a>
    </div>
  )
}
