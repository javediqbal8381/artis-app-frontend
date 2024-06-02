// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getOrdersAnalytics:builder.query({
      query: () => `/analytics/orders`,
    }),
    getProductsAnalytics:builder.query({
        query: () => `/analytics/products`,
      })
  }),
})
