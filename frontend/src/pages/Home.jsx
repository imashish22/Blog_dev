import React, { useContext, useEffect, useState } from 'react'
import HomePost from '../components/HomePost'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { URL } from '../url'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { UserContext } from '../context/UserContext'


const Home = () => {
  const {search} =useLocation()
  const [posts,setPosts]= useState([])
  const [noresult,setNoResult] = useState(false)
  const [loader,setLoader]= useState(false)
  const {user} = useContext(UserContext)

  const fetchPosts = async()=>{
    setLoader(true)
    try {

      const res = await axios.get(URL+'/api/posts/'+search)
      setPosts(res.data)
      if(res.data.length === 0){
        setNoResult(true)
      }
      else{
        setNoResult(false)
      }
      setLoader(false)

    } catch (err) {
      console.log(err)
      setLoader(true)
    }
  }
  useEffect(()=>{
    fetchPosts()
  },[search])

  return (
    <>
    <Navbar/>
      <div className='px-8 md:px-[200px] min-h-[80vh]'>
      {loader?<div className='h-[40vh] flex justify-center items-center"'><Loader/> </div>:!noresult?posts.map((post)=>(
        <>
        <Link to={user?`/posts/post/${post._id}`:"login"}>
        <HomePost key={post._id} post={post} />
        </Link>
        </>


      )
      ):<h3 className='text-center font-bold mt-16'>No Post Available</h3>}
    </div>
    <Footer/>
    </>
  
  )
}

export default Home