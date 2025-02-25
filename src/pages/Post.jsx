import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Container } from '../components/Container/Container'
import { PostForm } from '../components/post-form/PostForm'
import { usePost } from '../hooks/usePost'
import parse from 'react-html-parser'
import { appWriteService } from '../appwrite/config'


function Post() {
  const [post, setPost] = useState(null)
  const slug = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(()=> {
    appWriteService.getPost(slug).then((post)=>{
      if(post){
        setPost(post)
      }else{
        navigate('/');
      }
    })
  },[slug,navigate])
  const deletePost = async () => {
    appWriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appWriteService.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }
  return post?(
    <div className='py-8'>
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img className='rounded-xl' src={appWriteService.getFilePreview(post.featuredImage) }alt={post.title}/>
       {
        isAuthor&& (
          <div className="absolute-right-6 tp-6">
            <Link to= {`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost} >Delete</Button>

          </div>
        )
         
        }
       
        </div>
        <div className="w-full mb-6">
          <h1 className="text 2xl font-bold">
            {post.title}
          </h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ):null
}

export default Post