import { useDispatch, } from 'react-redux';
import { notify } from './NotificationComponent';
import { addToCartAsync } from '../redux/reducers/cartReducer';
const ProductCard = (props) => {
  const dispatch= useDispatch();
  const {product}=props;
 
 async function addtoCart(product){
    
    const result= await dispatch(addToCartAsync({product}));
    if(addToCartAsync.fulfilled.match(result)){

      notify(result.payload.message || 'Item add to cart Successfully!')
    }else{

      notify(result.payload.message || "Please login! ")
    }
   
    
  


  }
  return (
    <>
     
        
     
    <div className=' w-80  border-2 rounded-md p-3  text-xl shadow-md'>
      <div><img className='w-80 object-contain h-80' src={product.image} alt="" /></div>
      <div>
        <h1 className=' text-xl
         font-semibold capitalize mt-2'>{product.title.length>27? product.title.slice(0,26)+"...": product.title.slice(0,26)}</h1>
        <p className='mt-2 font-medium'>&#8377; {Math.floor(product.price*84)}</p>
        <button className=' mt-2 border-2 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 w-full text-white font-semibold' onClick={()=>addtoCart(product)
}>Add To Cart</button>
      </div>
    </div>
    </>

  )
}

export default ProductCard