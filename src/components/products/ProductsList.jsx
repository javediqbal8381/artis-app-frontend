import React from 'react';
import { useNavigate } from 'react-router-dom';
import StartRatings from '../commen/StartRatings';

const ProductList = ({products}) => {
  
  const navigate = useNavigate()
  const gotoProduct = (productId) => {
    navigate(`/products/${productId}`)
  }
  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <div
          key={product._id}
          className="max-w-xs rounded min-w-[300px] overflow-hidden shadow-lg m-4 transform transition-transform hover:scale-105 cursor-pointer"
          onClick={() => gotoProduct(product._id)}
        >
          <img
            className="w-full h-48 object-cover"
            src={product.images[0]}
            alt={product.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-mid min-h-[70px] mb-2">{product.name}</div>
            <p className="text-gray-700 text-base">{product.description}</p>
            <div className="font-bold mt-2">Rating: 
            <StartRatings rating={product.rating}/>
            </div>
            <p className="text-green-500 font-bold mt-2">{product.price} pkr</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
