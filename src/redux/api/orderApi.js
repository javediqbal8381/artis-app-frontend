// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    performSafePayPayment: builder.query({
      query: (price) => `/orders/payment?price=${price}`,
    }),
    saveOrder: builder.mutation({
      query: (orderData) => ({
        url: `/orders`,
        method: 'POST',
        body: orderData,
      }),
    }),
    getOrderByShop:builder.query({
      query: (shopId) => `/orders/byshop/${shopId}`,
    }),
    getAllOrders: builder.query({
      query: () => `/orders`,
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: 'DELETE',
      }),
    }),
    updateOrder: builder.mutation({
      query: ({orderId, orderData}) => ({
        url: `/orders/${orderId}`,
        method: 'PUT',
        body: orderData,
      }),
    }),
  }),
})
