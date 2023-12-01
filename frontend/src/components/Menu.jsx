import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../url'
import { Link } from 'react-router-dom'


const Menu = () => {
    const {user} =useContext(UserContext)
    const {setUser} = useContext(UserContext)

    const handleLogout = async()=>{
        try {
          const res = await axios.get(URL+"/api/auth/logout",{withCredentials:true})
          setUser(null)
        } catch (err) {
          console.log(err)
        }
    }

  return (
    <div className='bg-black  z-10 w-[200px] flex flex-col items-start absolute md:right-32 top-12 right-6 rounded-md space-y-4 p-4'>
    {  !user &&<h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to='/'>Login</Link></h3>}
    {  !user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to='/register'>Register</Link></h3>}
    {  user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to={'/profile/'+user._id} >Profile</Link></h3>}
    {  user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to='/write'>Write</Link></h3>}
    {  user && <h3 className='text-white text-sm hover:text-gray-500 cursor-pointer'><Link to={'/myblogs/'+user._id}>My Blogs</Link></h3>}
    {  user && <h3 onClick = {handleLogout} className='text-white text-sm hover:text-gray-500 cursor-pointer'>Logout</h3>}
    </div>
  )
}

export default Menu