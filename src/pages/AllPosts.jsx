import React, {useState,useEffect} from 'react'
import { Container, PostCard } from '../components'
import  appWriteService  from '../appwrite/config'
import { use } from 'react'


function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    appWriteService.getPosts([]).then((posts)=>{
      if(post){
        setPosts(posts.documents)
      }
    })
  },[])
  return (
    <div className='w-full py-6'>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post)=>(
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts