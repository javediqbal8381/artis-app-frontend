// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service for managing shops using a base URL and expected endpoints
export const shopsApi = createApi({
  reducerPath: 'shopsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getAllShops: builder.query({
      query: () => `/shops`,
    }),
    getShopById: builder.query({
      query: (shopId) => `/shops/${shopId}`,
    }),
    createShop: builder.mutation({
      query: (shopData) => ({
        url: `/shops`,
        method: 'POST',
        body: shopData,
      }),
    }),
    updateShop: builder.mutation({
      query: ({ shopId, shopData }) => ({
        url: `/shops/${shopId}`,
        method: 'PUT',
        body: shopData,
      }),
    }),
    deleteShop: builder.mutation({
      query: (shopId) => ({
        url: `/shops/${shopId}`,
        method: 'DELETE',
      }),
    }),
    addProductsToShop: builder.mutation({
      query: ({ shopId, products }) => ({
        url: `/shops/${shopId}/products`,
        method: 'POST',
        body: products,
      }),
    }),
    removeProductsFromShop: builder.mutation({
      query: ({ shopId, products }) => ({
        url: `/shops/${shopId}/products`,
        method: 'DELETE',
        body: products,
      }),
    }),
    getAllShopProducts: builder.query({
      query: (shopId) => `/shops/${shopId}/products`,
    }),
    getArtisShops: builder.query({
      query: (artisId) => `/shops/artis-shops/${artisId}`,
    }),
  }),
})
