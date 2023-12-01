import React from 'react'

const Footer = () => {
  return (
    <>
     <div className='mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-4 md:space-y-0 items-start  md:justify-between text-sm md:text-md py-8 '>
      <div className='flex flex-col text-white '>
        <p>Github</p>
        <p><a href="https://github.com/imashish22/" target='/'>imashish22 </a></p>
      </div>

      <div className='flex flex-col text-white '>
        <p>Contact</p>
        <p>imjhaashish22@gmail.com</p>
       
      </div>

      <div className='flex flex-col text-white '>
        <p>Privacy policy</p>
        <p>About us</p>
        <p>Terms and Condition</p>
        <p>Terms and Service</p>
      </div>


    </div>
    <p className='py-2 pb-6 text-sm text-center text-white bg-black'>All rights reserved to blog dev</p>
    </>
   
  )
}

export default Footer