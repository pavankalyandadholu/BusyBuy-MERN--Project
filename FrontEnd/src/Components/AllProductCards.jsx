
import ProductCard from './ProductCard';

const AllProductCards = ({products}) => {
  return (
    <div className=' flex items-center justify-center flex-wrap gap-8 mt-6'>

    {
    products.length>0 && products.map((p,i)=> <ProductCard key={i} product={p}/>
     )
    }
    </div>
  )
}

export default AllProductCards