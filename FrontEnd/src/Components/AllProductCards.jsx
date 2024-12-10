
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { productsSelector } from '../redux/reducers/productsReducer';

const AllProductCards = () => {
  const products= useSelector(productsSelector)
  return (
    <div className=' flex items-center justify-center flex-wrap gap-8 mt-6'>

    {
   products.length>0 && products[0].length>0 && products[0].map((p,i)=> <ProductCard key={i} product={p}/>
     )
    }
    </div>
  )
}

export default AllProductCards