import { useSelector,useDispatch } from "react-redux";
import OrdersComponent from "../Components/OrdersComponent"

import { initialStateAsync,orderSelector } from "../redux/reducers/orderReducer";
import { useEffect } from "react";

const Orders = () => {
  const dispatch =useDispatch();
  const {orders}=useSelector(orderSelector)
  useEffect(()=>{

    dispatch(initialStateAsync())
  },[])
  return (
    <>
    <div className=" mt-2 py-4">
    <h1 className="text-3xl  font-bold text-center">Your Orders</h1>
    {
     orders.length>0 ? orders.map((o,i)=><OrdersComponent key={i} orders={o}/>) :
     <h1 className=" text-3xl text-center mt-16">No orders Present! </h1>
    }
    
  
    </div>
    </>
  )
}

export default Orders