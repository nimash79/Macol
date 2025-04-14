import React from 'react'
import { Link } from 'react-router'

const CustomButton = ({text, link = false, route = "", ...props}) => {
  if (link) return (
    <Link to={route} className='custom-button' {...props}>
        {text}
    </Link>
  )
  else return (
    <button type='button' className='custom-button' {...props}>
        {text}
    </button>
  )
}

export default CustomButton