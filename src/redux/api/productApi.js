// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getHomeProducts: builder.query({
      query: () => `/products/top-ratings`,
    }),
    getProductDetails: builder.query({
      query: (productId) => `/products/product-details/${productId}`,
    }),
    getAllProducts: builder.query({
      query: () => `/products`,
    }),
    getCaratorizedProducts: builder.query({
      query: (catagory) => `/products/category/${catagory}`,
    }),
    getProductsDetailList: builder.mutation({
      query: (productsIds) => ({
        url: `products/detail-list/byIds`,
        method: 'POST',
        body: productsIds,
      }),
    }),
    getplaceOrder: builder.query({
      query: (catagory) => `/orders/payment`,
    }),
    uploadProduct: builder.mutation({
      query: (product) => ({
        url: `shops/${product.shopId}/products`,
        method: 'POST',
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `products/delete`,
        method: 'DELETE',
        body: data,
      }),
    }),
    rateProduct: builder.mutation({
      query: (data) => ({
        url: `products/product-rate`,
        method: 'POST',
        body: data,
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.productId}`,
        method: 'PUT',
        body: data.updatedProductData,
      }),
    }),
  }),
})
