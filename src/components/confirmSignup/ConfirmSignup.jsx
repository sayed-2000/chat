import React, { useEffect } from 'react'
import './confirmSignup.scss'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import axios from 'axios'


function ConfirmSignup() {
  
  let url =  useLocation()



  useEffect(()=> {

       const urlParams = new URLSearchParams(url.search);
       const  token  =  urlParams.get('token');
       console.log(token);



      if (token) {
            axios.post('https://replace-apis.onrender.com/api/v1/auth/verify-signup', {token})
          .then((res) => {
            if (res.data.status === "Success") { 
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("user",JSON.stringify(res.data.user))
                window.location.assign("/")
                console.log("sayed it work");
            }
         })
           .catch(e => console.log(e)) 
      }
    
  },[])




  return (
    <div className='ConfirmSignup'>
        <div className="box">
             <div className="text">
                <h1>Thank you </h1>
                <p>your subscription has been confirmed </p> 
             </div>
        </div>
    </div>
  )
}

export default ConfirmSignup
