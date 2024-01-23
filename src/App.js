import './App.scss';
import ConfirmSignup from './components/confirmSignup/ConfirmSignup';
import LogIn from './components/login-1/Login1';
import Message from './components/message/Message';
import Singup from './components/singup/Singup'
import Chat from './components/chat/Chat.jsx';
import Test from './components/Test.jsx';
import { Route, BrowserRouter as Router, Routes,HashRouter } from 'react-router-dom';
import {useToken} from "./store/zustand.js"
import Main from './components/Main.jsx';



function App() {

  const {token , user }  = useToken()

  return (
    <div className="App">  
      <HashRouter>
        <Routes> 
           {
            token ?  <Route path='/' element={<Chat/>}/> 
            :<Route  path='/' element={<Main/>}>
                  <Route  path='' element={<LogIn/>}></Route>
                  <Route path='singup' element={<Singup/>}/>
                  <Route path='message' element={<Message/>}/>
                  <Route path='confirmSignup' element={<ConfirmSignup/>}/>
            </Route>
           }
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
