import React from 'react'

function button({children,
    type = 'button',
    bgcolor='bg-blue-600',
    textcolor='text-white',
    classname='text-white',
    ...props}) {
  return (
   <button type={type} className={`px-4 py-2 ${bgcolor} ${textcolor} ${classname}`} {...props}>{children}</button>
  )
}

export default button