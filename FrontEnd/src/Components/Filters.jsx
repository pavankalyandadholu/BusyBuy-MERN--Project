import  { useState } from 'react';

const Filters = ({ onFiltersChange }) => {
  const [priceRange, setPriceRange] = useState(99991); // Default max price
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category];
  
      // Call onFiltersChange with the updated state
      onFiltersChange({ priceRange, categories: updatedCategories });
  
      return updatedCategories;
    });
  };
  

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange(value);
    onFiltersChange({ priceRange: value, categories });
  };

  return (
    <div className='p-3 pl-8 sm:pl-3 bg-blue-100 rounded-md w-full sm:w-["100px"] min-w-56 mt-7'>
      <h1 className='text-xl font-medium'>Filter</h1>
      <div>
        <p className='text-lg mt-2'>Price: {priceRange}</p>
        <input
          className='appearance-none w-48 sm:w-full cursor-pointer h-2 bg-blue-600 rounded-full'
          type="range"
          min="0"
          max="99991"
          step="10"
          value={priceRange}
          onChange={handlePriceChange}
        />
      </div>
      <div className='mt-4'>
        <h1 className='text-xl font-semibold'>Category</h1>
        {['Men\'s clothing', 'Women\'s clothing', 'Jewelery', 'Electronics'].map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              checked={categories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label className='ml-1 text-lg font-medium' htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
