import React from 'react'
import  { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BiChat,BiEnvelope,BiSolidUser,BiLock } from "react-icons/bi";
import { VscCoffee } from "react-icons/vsc";
import {  useNavigate} from 'react-router-dom';


function LogIn() {

 const token = localStorage.getItem("token")

  const navigate = useNavigate()




  
  

    useEffect(() => {
      token && navigate("/")
  },[])


 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

 



  

   async  function handleFormLogin  (e)  {
      e.preventDefault()

      console.log(email);
      console.log(password);

      if (!email == "" && !password == "" ) {
          await   axios.post('https://replace-apis.onrender.com/api/v1/auth/login', {email,password})
                       .then((res) => {
                          if (res.status === 200) { 
                              localStorage.setItem("token",res.data.token)
                              localStorage.setItem("user",JSON.stringify(res.data.user))
                              window.location.assign("/")
                          } else {
                            console.log(res);
                          }
                       })
                      }
                      } 
                      

          const myStyle =  {
            marginBottom: '40px',
          }
          







  return (
    <div className='login'>
    <div className="Circle"></div>
    <div className="content">
        <div className="box_text">
            <div className="itme">
                <span className='logo'> 
                <BiChat/>
                  <h1 >Digital chat</h1>
                </span>
                <p>share your  smile  with this world and find friends</p>
                <span className="logo-2">
                 <VscCoffee />
                  <p >Enjoy..!</p>
                </span>
            </div>

        </div>
        <div className="box-input">
            <div className="itme">
                 <h1>Log in HERE</h1>
                <form action='#' onSubmit={handleFormLogin}>
                            <div className="input_registration">
                                <div className="input" style={myStyle}>
                                <input placeholder='Enter your Email' name="email" onChange={e => setEmail(e.target.value)} value={email}   />
                                     <span className="icon">
                                        <BiEnvelope/>
                                     </span>
                                </div>
                                <div className="input" style={myStyle}>
                                <input type="password" placeholder=' Enter your password' onChange={e => setPassword(e.target.value)}/>
                                     <span className="icon">
                                        <BiLock/>
                                     </span>
                                </div> 
                            </div>
                            <input className={`bottom `} type="submit" value = "continue" />
                            <p className="create"><a href="#/singup"> Create an account</a></p>
                </form>
            </div>
        </div>
    </div>    
    </div>
  )
}

export default LogIn
