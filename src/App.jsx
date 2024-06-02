import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import Products from './pages/Products';
import Shops from './pages/Shops';
import ShopDetails from './pages/ShopDetail';
import ProductDetail from './pages/productDetail';
import CatagorizedProducts from './pages/CatagorizedProducts';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderCompletePage from './pages/OrderCompletePage';
import ProtectedRoutes from './components/ProtectedRoutes';
import ArtisShops from './pages/artis/ArtisShops';
import ArtisShopDetail from './pages/artis/ArtisShopDetail';
import ErrorPage from './components/commen/ErrorPage';
import Dashboard from './pages/admin/dashboard';
import AdminRoutes from './components/AdminRoutes';




function App() {

  const router = createBrowserRouter([
    {
      path: "/home",
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: "/signup",
      element: <SignUp />,
      errorElement: <ErrorPage />
    },
    {
      path: "/signin",
      element: <SignIn />,
      errorElement: <ErrorPage />
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Home />,
          errorElement: <ErrorPage />
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:productId",
          element: <ProductDetail />,
        },
        {
          path: "/products/catagory/:catagory",
          element: <CatagorizedProducts />,
        },
        {
          path: "/shops",
          element: <Shops />,
        },
        {
          path: "/shops/:shopId",
          element: <ShopDetails />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/payment",
          element: <Payment />,
        },
        {
          path: "/order-completed",
          element: <OrderCompletePage />,
        },
        {
          path: "/artis-shops",
          element: <ArtisShops />,
        },
        {
          path: "/artis-shop-detail/:shopId",
          element: <ArtisShopDetail />,
        },
      ],
      // errorElement: <ErrorPage/>
    },
    {
      element: <AdminRoutes />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        }
      ]
    }
  ]);

  return (
    <div className='APP'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
