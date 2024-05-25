import React from 'react'
import { useContext} from 'react'
import { UserContext } from './UserContext'
import Register from './Components/Register'
import Login from './Components/Login'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import { useState } from 'react'
import Main from './Components/Main/Main'


const App = () => {
  const [sidebar, setSidebar] = React.useState(true);
  const [currentForm, setCurrentForm] = useState("login")
  const currentUser = useContext(UserContext)

  function toggleForm(formName){
    setCurrentForm(formName)
  }


    
  return (
    <div>
      {currentUser ?<>
          <Navbar setSidebar={setSidebar}/>
        <Main />
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} />} />
          <Route path="/video/:categoryId/:videoId" element={<Video />} />
        </Routes>
        </> :
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}  />}
     
    
    </div>
  )
}


export default App