import { useDispatch } from 'react-redux';
import { userActions } from '../redux/reducers/userReducer';
import { notify } from './NotificationComponent';
import { addToCartAsync,reduceFromCartAsync, removeFromCartAsync } from '../redux/reducers/cartReducer';
import { useEffect } from 'react';
const CartCard = ({product}) => {
 
  const dispatch= useDispatch()
 
 async function handleRemove(){
   const result= await dispatch(removeFromCartAsync(product.productDetails.id));
   if(removeFromCartAsync.fulfilled.match(result)){
    notify('Remove from Cart Successfully!');
    
  }else{
    notify('Something went Wrong! ')
  }
  }
    return (
        <div className=' w-80  border-2 rounded-md p-3  text-xl shadow-md'>
          <div><img className='w-80 object-contain h-80' src={product.productDetails.image} alt="" /></div>
          <div>
            <h1 className=' text-xl
             font-semibold capitalize mt-2'>{product.productDetails.title.length>27? product.productDetails.title.slice(0,26)+"...": product.productDetails.title.slice(0,26)}</h1>
             <div className='flex justify-between items-center'>
            <p className='mt-2 font-medium'>&#8377; {Math.floor(product.productDetails.price*84)}</p>
            <div className=' w-20  flex justify-between items-center px-1 text-2xl'>
            <button onClick={()=>dispatch(reduceFromCartAsync(product.productDetails.id))} className=''>-</button>
            <span className=''>{product.itemQuantity}</span>
            <button onClick={
              ()=>{
                dispatch(addToCartAsync({product:product.productDetails}))
                // dispatch(initialStateAsync())
              }
          }>+</button>
            </div>
             </div>
            <button onClick={handleRemove} className=' mt-2 border-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 w-full text-white font-semibold'>Remove From Cart</button>
          </div>
        </div>
      )
}

export default CartCard