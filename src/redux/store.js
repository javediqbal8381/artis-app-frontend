import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './api/productApi'
import cartSlice from './slices/cartSlice'
import { shopsApi } from './api/shopsApi'
import { ordersApi } from './api/orderApi'
import { usersApi } from './api/userApi'
import { analyticsApi } from './api/analyticsApi'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [productsApi.reducerPath]: productsApi.reducer,
    [shopsApi.reducerPath]: shopsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,

    cart: cartSlice
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      shopsApi.middleware,
      ordersApi.middleware,
      usersApi.middleware,
      analyticsApi.middleware,
    ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)