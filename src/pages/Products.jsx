import React from 'react'
import Layout from '../components/layouts/Layout'
import ProductList from '../components/products/ProductsList'
import { productsApi } from '../redux/api/productApi'
import Loader from '../components/commen/Loader'

const Products = () => {
  const {isLoading,isError,data:allProducts} = productsApi.useGetAllProductsQuery()
  return (
    <Layout>
     {
      isLoading ? 
      <div className='w-[100%] h-[90vh]'>
        <Loader/>
      </div> :
      <ProductList products={allProducts} />
     }
    </Layout>
  )
}

export default Products