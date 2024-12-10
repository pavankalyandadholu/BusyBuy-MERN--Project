import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducers/userReducer';
const ProtectedRoute = (props) => {
    const {isLoggedIn}=useSelector(userSelector);
  if(!isLoggedIn){
    Navigate({to:"/signin"})
  }
  return (
    <>
   {props.children} 
    </>
  )
}

export default ProtectedRoute