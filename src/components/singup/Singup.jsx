import './singup.scss'
import  { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { BiChat,BiEnvelope,BiSolidUser,BiLock } from "react-icons/bi";
import { VscCoffee } from "react-icons/vsc";










function Singup() {



    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [dateOfBirth, setDateOfBirth] = useState("2000-09-08");




      async  function handleFormCreate (e)  {
            e.preventDefault()
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(password);
            console.log(confirmPassword);
            console.log(dateOfBirth);


            if(  firstName  && email && password && dateOfBirth ) {
           await axios.post('https://replace-apis.onrender.com/api/v1/auth/signup', {email,password,confirmPassword,firstName,lastName,dateOfBirth})
           .then((res) => {
            console.log(res);
                if(res.data.status === "Success") {
                    window.location.assign("#/message")
                }
           })


           .catch(e => console.log(e))
          }
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
                         <h1>SIGN UP HERE</h1>
                        <form action='#' onSubmit={handleFormCreate}>
                                    <div className="input_registration">
                                        <div className="input">
                                             <input type="text" placeholder='Enter your First name' onChange={e => setFirstName(e.target.value)}/>
                                             <span className="icon">
                                                <BiSolidUser/>
                                             </span>
                                        </div>
                                        <div className="input">
                                        <input type="text" placeholder='Enter your last name' onChange={e => setLastName(e.target.value)}/>
                                             <span className="icon">
                                                 <BiSolidUser/>               
                                             </span>
                                        </div>
                                        <div className="input">
                                        <input placeholder='Enter your Email' name="email" value={email} onChange={e => setEmail(e.target.value)}   />
                                             <span className="icon">
                                                <BiEnvelope/>
                                             </span>
                                        </div>
                                        <div className="input">
                                        <input type="password" placeholder=' Enter your password' onChange={e => setPassword(e.target.value)}/>
                                             <span className="icon">
                                                <BiLock/>
                                             </span>
                                        </div>
                                        <div className="input">
                                        <input type="password" placeholder='confirm Password' onChange={e => setConfirmPassword(e.target.value)} className={`${password !== confirmPassword ? "error" : ""}`}/>
                                             <span className="icon">
                                                <BiLock/>
                                             </span>
                                        </div>
                                               
                                    </div>
                                    <input className={`bottom `} type="submit" value = "continue" />
                        </form>
                    </div>
                </div>
            </div>

        
        </div>
  )
}

export default Singup
