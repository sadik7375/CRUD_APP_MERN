
import {BrowserRouter,Routes,Route} from 'react-router-dom'  //forgot import react-router-dom
import Users from './Users'
import CreateUsers from './CreateUsers'
import UpdateUser from './UpdateUsers'





function App() {
 

  return (
    <>
        <div>
          
          
          <BrowserRouter>
         
      <Routes>
        <Route path="/" element={<Users></Users>} />
        <Route path="/createuser" element={<CreateUsers></CreateUsers>}></Route>
        <Route path="/update/:id" element={<UpdateUser></UpdateUser>} ></Route>


      </Routes>
    </BrowserRouter>s



        </div>
       
    </>
  )
}

export default App
