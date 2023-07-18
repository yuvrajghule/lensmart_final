import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivatRoute = (props) => {
  // let auth={'token': false}
  return (
   props.Auth ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivatRoute