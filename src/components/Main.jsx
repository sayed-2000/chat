import React, { useEffect } from 'react'
import ConfirmSignup from './confirmSignup/ConfirmSignup'
import Message from './message/Message'
import Singup from './singup/Singup'
import { Outlet,useNavigate } from 'react-router-dom'

function Main() {

  const token = localStorage.getItem("token")
  const navigate = useNavigate()

    useEffect(() => {
      token && navigate("/")
  },[])
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default Main
