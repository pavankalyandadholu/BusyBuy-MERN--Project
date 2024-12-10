import 'react-toastify/dist/ReactToastify.css'

import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Logout from './pages/Logout'
import ProtectedRoute from './Components/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initialStateAsync } from './redux/reducers/productsReducer'
function App() {
  const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(initialStateAsync())
  },[])
  const router=createBrowserRouter([
    {
      path:"/",element:<Navbar/>,
      children:[
        {
          index:true,
          element:<Home/>
        },{
          path:"orders",
          element:<ProtectedRoute><Orders/></ProtectedRoute>
            
        },
        {
          path:'signin',
          element:<SignIn/>
        },
        {
          path:'signup',
          element:<SignUp/>
        },
        {
          path:'cart',
          element:<ProtectedRoute><Cart/></ProtectedRoute>
           
        },{
          path:'logout',
          element:<ProtectedRoute><Logout/></ProtectedRoute>
        }
      ]

    }
  ])
  return (
    <>

    <RouterProvider router={router} />


    </>
  )
}

export default App
