import React from 'react'
import products from '../../data/products.json'
import ProductList from '../products/ProductsList'
import { productsApi } from '../../redux/api/productApi'
import Loader from '../commen/Loader'

const HomeProducts = () => {
    const {isError,isLoading,data} = productsApi.useGetHomeProductsQuery()
    
    return (
        <div>
            {
                isLoading ? 
                <Loader/> :
                <ProductList products={data || []} />
            }
        </div>
    )
}

export default HomeProducts