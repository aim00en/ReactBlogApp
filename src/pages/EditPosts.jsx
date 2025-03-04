import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import  appwiteService from '../appwrite/config'
import  Container from '../components/container/container'
import PostForm from '../components/post-form/PostForm'



function EditPosts() {
  const [Post, SetPost] = useState()
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(slug){
      appwiteService.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
        }
        else{
          navigate('/')
        }
      })
    }
  },[])
    return (
    <div className='py-6'>
      <Container>
        <PostForm post={Post} />
      </Container>
    </div>
  )
}

export default EditPosts