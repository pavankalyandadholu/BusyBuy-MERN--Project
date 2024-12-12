import { useSelector } from 'react-redux';
import AllProductCards from '../Components/AllProductCards';
import Filters from '../Components/Filters';
import { productsSelector } from '../redux/reducers/productsReducer';
import { useEffect, useState } from 'react';

const Home = () => {
  const products = useSelector(productsSelector);
  const [filters, setFilters] = useState({ priceRange: 99991, categories: [] });
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      
      const result = products[0].filter((product) => {
        const matchesPrice = Math.floor(product.price * 84) <= filters.priceRange;
        const matchesCategory =
          filters.categories.length === 0 || filters.categories.includes(product.category);
        const matchesSearch = 
          searchTerm === '' ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase().trim()); // Search logic
        return matchesPrice && matchesCategory && matchesSearch;
      });
      setFilteredProducts([...result]);
    }
  }, [filters.categories, filters.priceRange, searchTerm, products]);

  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  return (
    <>
      <div className='mt-6 flex items-center justify-center'>
        <form>
          <input
            className='w-96 p-2 border-2 outline-none rounded-md text-lg placeholder:text-lg'
            type="text"
            placeholder='Search By Name'
            value={searchTerm}
            onChange={handleSearchChange} // Update on input change
          />
        </form>
      </div>
      <div className='flex flex-col sm:flex-row items-start justify-center gap-5'>
        <Filters onFiltersChange={handleFiltersChange} />
        <AllProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default Home;
