import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/reducers/userReducer';
const ProtectedRoute = (props) => {
    const {token}=useSelector(userSelector);
  if(!token){
    Navigate({to:"/signin"})
  }
  return (
    <>
   {props.children} 
    </>
  )
}

export default ProtectedRoute