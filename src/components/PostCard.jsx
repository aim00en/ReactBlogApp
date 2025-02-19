import React from 'react'
import { Link } from 'react-router-dom'
import appWriteService from '../appwrite/config.js'

function PostCard(
    {
        title,
        $id,
        content,
        featuredImage,
        ...props
    }
) {
    return (
        <Link to={`/post/${$id}`} className='w-full'>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='mb-4 justify-center w-full'>
                    <img
                        src={appWriteService.getFilePreview(featuredImage)}
                        alt='featured'
                        className='w-full h-48 object-cover rounded-lg' />
                </div>
                <h2 className='text-2xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard