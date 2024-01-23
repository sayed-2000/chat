import React, { useEffect, useState, useRef } from 'react'
import './chat.scss'
import { FaUsers } from "react-icons/fa";
import BlockUser from './BlockUser';
import image from '../../images/images (1).png'
import { IoMdSend } from "react-icons/io";
import {useToken} from "../../store/zustand"
import axios from 'axios';
import io from "socket.io-client";
import {v4 as uuid} from 'uuid' 
import { Outlet,useNavigate,useParams,useLocation } from 'react-router-dom'
import sound from '../../sound/message-sound.mp3';


const socket = io.connect("https://replace-apis.onrender.com");

function Chat() {

  const play = () => {
    new Audio(sound).play()
  }


  const navigate = useNavigate()

    

     const  {token , user , userId , setUserId,IdNotification,setIdNotification}  = useToken()


    let myId =  user._id;
    let myToken = token;


    const [activeElement, setActiveElement] = useState(null);
    const [users,setUsers] = useState([])
    const [messageUsers, setMessageUsers] = useState([]);
    const [chat,setChat]= useState([]);
    const [message, setMessage] = useState("");
    const [name, setNAme] = useState("");
    const [friendMessage, setFriendMessage] = useState("");
    const [sender, setSender] = useState("")


    const boxUserChatRef = useRef(null);





    useEffect(() => {
      console.log("my name ====>", user.firstName);



        const getAllUsers = async () => {
          try {
            const response = await axios.get('https://replace-apis.onrender.com/api/v1/users/all', {
              headers: {
                Authorization: `Bearer ${myToken}`
              }
            });
            setUsers(response.data.users.filter((e) => e._id !== myId));
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
      
        const handleSocketEvents = () => {
          socket.emit("get_rooms", '65916a72419a917ce8d5c014');
      
          socket.on("get_rooms", (rooms) => {
            if (rooms !== undefined) {
              rooms.forEach((room) => {
                socket.emit("join_room", room);
              });
            }
          });
      
          socket.on("message", (message) => {
            play()
            setSender(message.sender)
            setFriendMessage(message.message)
            setMessageUsers((prevMessages) => [...prevMessages, {userMessage:message.message}]);
            setFriendMessage(message.message);
          });
      
          socket.on("my_message", (message) => {
            setMessageUsers((prevMessages) => [...prevMessages, {yourMessage:message.message}]);
          });
        };
      
        getAllUsers();
        handleSocketEvents();
      
        return () => {
          socket.off("get_rooms");
          socket.off("message");
          socket.off("my_message");
        };
      
      }, []);

 


    let room_id;
    const send = async (friendId) => { 
      const res = await axios
      .get(          
       ` https://replace-apis.onrender.com/api/v1/chats/one/${myId}/${friendId}`, 
        {
          headers:{
                     Authorization: `Bearer ${myToken}` 
                  }
        }
          )
      if(res.data.chat.length ===0){
        room_id = uuid();
        setChat([])
        console.log({room_id});
      }else{
        room_id = res.data.chat[0].room;
        setChat(res.data.chat)      
      }
    }



    const sendMessage = () => {
      socket.emit("message", { sender:myId,recipient:userId,message });
      console.log(myId);
      setIdNotification(myId)
     setMessage('')
  };


  const scrollHandleUserBox =  () => {
    if(chat.length != 0) {
          boxUserChatRef.current.scrollTop = boxUserChatRef.current.scrollHeight
    }
  }


 

    const handleElementClick = (e) => {
      setActiveElement(e.id);
      setUserId(e.id)
      setNAme(e.name)
      send(e.id)
      setMessageUsers([])
      scrollHandleUserBox()
    };


    const logOut = () => {
      localStorage.removeItem("token")   
      window.location.assign("/")
    }

  return (
    <>
    <div className="chat" >
        <div className="users">
            <div className="logo">
                <span className="icon">
                <FaUsers />
                </span>
                <h3 className="text">Chat Room </h3>
            </div>
            <div className="label">
                    <h2>users</h2>
                    <span>{users.length}</span>
            </div>
            <div className="box-users" >
                <div className="container-user">
                {
                   users.length > 0 ? users.map((e)=> (
                        <>  
                           
                            <BlockUser
                               key={e._id}
                               id={e._id}
                               onClick={() => handleElementClick({id:e._id,name:e.firstName})}
                               isActive={activeElement === e._id}
                               name = {e.firstName}
                               messageUsers = {messageUsers.length}
                               sender = {sender}
                            />

                      </>
                    )) : null
                }
                </div>
            </div>
            <div className="log-out">
                <bottom onClick={logOut}>Log out</bottom>
            </div>
        </div>

        {
          name !=="" ? (
            <div className="conv">
            { name !=="" ? (
                      <div className="top">
                          <div className="container-top">
                              <img src={image} alt="" />
                              <h3>{name}</h3>
                          </div>
                    </div>
            ) : null

            }
 
            <div className="box-user-chat" ref={boxUserChatRef} >
                { 
                     chat.length > 0 ? chat.map((e,index) => (
                        <>
                        {
                          
                          e.sender === myId ? (
                            <div className="your-message" key={index}>
                                <img src={image}  />
                                <span className="text">
                                    {`${e.message} `}
                                </span>
                            </div>
                             ) : (
                              <div className="user-message"  key={index}>
                                  <img src={image}  />
                                  <span className="text">
                                      {e.message}
                                  </span>
                             </div>
                             )
                        }
                            
                        </>
                        )) :null 
                 }
              


                { 
                     messageUsers.length > 0 ? messageUsers.map((e,index) => (
                        <>
                     {
                        e.yourMessage &&    
                        <div className="your-message" key={index}>
                            <img src={image}  />
                            <span className="text">
                               {`${e.yourMessage}`} 
                            </span>
                        </div>
                     }

                {
                        e.userMessage &&    
                        <div className="user-message">
                            <img src={image}  />
                            <span className="text">
                                {e.userMessage}
                            </span>
                        </div>
                     }
                     {console.log(e)}
                        </>
                        )) :null 
                 } 

            </div>
            <div className="input">
                <form action="#">
                    <div className="send">
                        <input type="text" value={message} placeholder='Message...' onChange={(e) => { setMessage(e.target.value);}} />
                        <span onClick={sendMessage}> 
                        <IoMdSend />
                        </span>
                    </div>
                </form>
            </div>
        </div>
          ): 
          (
            <div className='conv'> 
                <div className="start">
                    <span>
                       <FaUsers />
                    </span>
                     <h1>Start a chat with someone</h1>
                </div>

            </div>
          )
        }


  

    </div>
    </>
  )
}

export default Chat
