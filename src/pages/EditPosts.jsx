import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import  appwiteService from '../appwrite/config'
import  Container from '../components/container/container'
import PostForm from '../components/post-form/PostForm'



function EditPosts() {
  const [Post, setPost] = useState()
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(slug){
      appwiteService.getPost(slug).then((post)=>{
        if(post){
          setPost(post)
          console.log("from Edit Post: ", post)
        }
        else{
          navigate('/')
        }
      })
    }
  },[slug, navigate])

    return Post ? (
      <div className='py-8'>
          <Container>
              <PostForm Post={Post} />
          </Container>
      </div>
    ) : null
}

export default EditPosts