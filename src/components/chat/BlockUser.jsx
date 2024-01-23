import React, { useEffect } from 'react'
import iamgeUser from '../../images/images (1).png'
import { log } from 'util';
import {useToken} from "../../store/zustand"

function BlockUser({ id, onClick, isActive,name,messageUsers,IdNotification,sender }) {

    const containerStyle = {
        backgroundColor: isActive ? '#2470e1' : '#262948',
        padding: '20px',
        cursor: 'pointer',
        marginBottom: '10px',
      };


  return (
          <div className='box-account' style={containerStyle} onClick={() => onClick(id)} key={id}>
                     <img src={iamgeUser} alt="" />
                     <p >{`${name} `}</p>
                     {
                      messageUsers > 0 && id === sender && !isActive    ? <span>{messageUsers}</span> : null
                     }
          </div>
  )
}

export default BlockUser
