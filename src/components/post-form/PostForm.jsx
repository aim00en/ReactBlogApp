import React, { useCallback } from 'react'
import { useForm } from "react-hook-form";
import Button from '../Button'
import  Select  from '../Select'
import Input  from '../Input'
import RTE  from '../RTE'
import { useNavigate } from 'react-router-dom'
import appWriteService from '../../appwrite/config'
import { useSelector } from 'react-redux';


export default function PostForm({ Post }) {

  const { register, handleSubmit, watch, setValue, getValue, control } = useForm({
    defaultValues: {
      title: Post?.title || '',
      slug: Post?.slug || '',
      content: Post?.content || '',
      status: Post?.status || 'active',
    }
  });
  const navigate = useNavigate();
  const userDate = useSelctor((state) => state.auth.user)

  const submit = async (data) => {
    if (Post) {
      const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null;
      if (file) {
        appWriteService.deleteFile(Post.featuredImage)
      }
      const dbPost =
        await appWriteService.updatePost(Post.$id, {
          ...data,
          image: file ? file.$id : undefined
        })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = appWriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id
        data.featuredimage = fileId;
        const dbPost = await appWriteService.createPost({ ...data, userId: userData.$id });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
  })

  React.useEffect(() => {
    watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })
  }, [watch, slugTransform, setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className='felex-wrap'>
      <div className='w-2/3 px-2'>
        <Input label="Title"
          placeholder="Title"
          className='mb-4'
          {...register('title', { required: 'Title is required' })}
        />
        <Input label="Slug:"
          placeholder="Slug"
          className='mb-4'
          {...register('slug', { required: 'Title is required' })}
          onInput={(e) => { 'slug', slugTransform(e.currentTarget.value), { shouldValidate: true } }}
        />
        <RTE
          label='Content'
          name='Content'
          control={control}
          defaultValue={getValue("content")} />
      </div>
      <div className='w-1/3 px-2'>
        <Input label="Featured Image"
          className='mb-4'
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !Post })}
        />
        {Post && (
          <div classname='w-full mb-4'>
            <img src={appWriteService.getFilePreview(Post.featuredImage)}
              alt={Post.title}
              className='rounded-lg' />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label='Status'
          className='mb-4'
          {...register('status', { required: true })}
        />
         <Button type="submit" bgColor={Post ? "bg-green-500" :  "bg-red-500"} className="w-full">
          {Post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}