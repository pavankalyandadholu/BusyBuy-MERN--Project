import { useDispatch } from 'react-redux';
import { userActions } from '../redux/reducers/userReducer';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const dispatch= useDispatch()
  
  dispatch(userActions.logoutUser()); 
  Navigate({to:'/signin'})
}

export default Logout