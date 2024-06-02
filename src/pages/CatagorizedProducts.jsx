import React from 'react'
import ProductList from '../components/products/ProductsList'
import Layout from '../components/layouts/Layout'
import products from '../data/products.json'
import { useParams } from 'react-router-dom'
import { productsApi } from '../redux/api/productApi'
import Loader from '../components/commen/Loader'
import { motion } from "framer-motion"; // Import Framer Motion


const CatagorizedProducts = () => {
  const {catagory} = useParams()
  console.log(catagory)
  const {isLoading,isError,data:catagorizedProducts} = productsApi.useGetCaratorizedProductsQuery(catagory)

  return (
    <Layout>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
      <div>
        {
          isLoading ?
          <Loader/> :
        <ProductList products={catagorizedProducts}/>
}
    </div>
    </motion.div>
    </Layout>
  )
}

export default CatagorizedProducts