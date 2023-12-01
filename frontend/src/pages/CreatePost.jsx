import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {ImCross} from 'react-icons/im'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'


const CreatePost = () => {
        const [title,setTitle]= useState('')
        const [desc,setDesc]= useState("")
        const [file,setFile] = useState(null)
        const {user} = useContext(UserContext)
        const [cat,setCat] = useState('')
        const [cats,setCats] = useState([])
        const navigate = useNavigate()

        const addCategory=()=>{
            let updatedCats = [...cats]
            updatedCats.push(cat)
            setCat(" ")
            setCats(updatedCats)
        }

        const deleteCategory = (i) =>{
            let updatedCats = [...cats]
            updatedCats.splice(i)
            setCats(updatedCats)
        }

        const handleCreate = async(e)=>{
            e.preventDefault()
            if(desc.length > 1000){
                alert('description length should be Less than 1000')
                return
              }
            const post = {

                title,
                desc,
                username:user.username,
                userId:user._id,
                categories:cats
            }
            if(file){
                const data = new FormData()
                const filename  = Date.now()+file.name
                data.append("img",filename)
                data.append("file",file)
                post.photo = filename


                try{
                    const imgUpload = await axios.post(URL+"/api/upload",data)
                    console.log(imgUpload.data)
                  }
                  catch(err){
                      console.log(err)
                  }
            }
            try { 
                const res=await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
                navigate('/posts/post/'+res.data._id)                
            } catch (err) {
                console.log(err)
            }

          
        }


    return (
        <div>
            <Navbar/>
            <div className='px-6 md:px-[200px] mt-8'>
                <h1 className='font-bold md:text-2xl text-xl mt-8'>Create a Post</h1>
                <form action="" className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                    <input type="text" onChange={(e)=>setTitle(e.target.value)} className='px-4 py-2 outline-none' placeholder='enter post title' name="" id="" />
                    <input type="file" onChange={(e)=>setFile(e.target.files[0])} className='px-4 ' placeholder='enter post title' name="" id="" />
                    <div className='flex flex-col '>
                    <div className='flex items-center space-x-4 md:space-x-8'>
                    <input value={cat} onChange={(e)=>setCat(e.target.value)} className='px-4 py-2 outline-none' placeholder='Enter post category' type="text"/>
                    <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-lg'>Add</div>
                </div>

                        <div className='flex px-4 mt-3'>
                {cats?.map((c,i)=>(
                    <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                    <p>{c}</p>
                    <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
                </div>
                ))}   
        </div>
                    </div>
                    <p>Description Length {desc.length}/1000</p>
                    <textarea rows={15} cols={30} onChange={(e)=>setDesc(e.target.value)} className='px-4 py-2 outline-none' placeholder='enter post description'/>
                    <button onClick={handleCreate} className='bg-black text-white w-full md:w-[20%] mx-auto font-semibold px-4 py-2 md:text-xl text-lg rounded-lg '>Create</button>
                </form>

            </div>
            <Footer/>
        </div>
    )
    }

export default CreatePost