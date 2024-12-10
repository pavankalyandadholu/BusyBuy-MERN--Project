import { ToastContainer,toast } from 'react-toastify'
const NotificationComponent = ( ) => {
    
  return (
<ToastContainer />
     
  )
}
 const notify = (msg)=>{
    toast(msg);
}
export  {NotificationComponent,notify}