import { useSelector } from "react-redux";
import OrdersComponent from "../Components/OrdersComponent"

import { userSelector } from "../redux/reducers/userReducer";

const Orders = () => {
  const {isLoggedIn}= useSelector(userSelector)
  return (
    <>
    <div className=" mt-2 py-4">
    <h1 className="text-3xl  font-bold text-center">Your Orders</h1>
    {
      isLoggedIn && isLoggedIn.orders.map((o,i)=><OrdersComponent key={i} orders={o}/>) 
    }
    
  
    </div>
    </>
  )
}

export default Orders