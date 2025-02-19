import React, { useId } from 'react'

const input = React.forwardRef(function input({ label,
    type = 'text',
    classname = '',
    ...props },
    ref) {
    const id = useId
    return (
        <div className='w-full'>
            {label &&
                (<label htmlFor={id} className='inline-block mb-1 pl-1'>
                    {label}
                </label>)}
            <input type={type}
                ref={ref}
                {...props}
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none w-full focus:bg-gray-50 
                duration-200 border border-gray-200 ${classname}`} 
            ></input>
        </div>
    )
})


export default input