import './App.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { LoginPage, SignUpPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FaqPage, ProductDetailPage, ProfilePage, ShopCreatePage, SellerActivationPage, ShopLoginPage, CheckoutPage, PaymentPage } from './routes/Routes.jsx';
import { ShopHomePage } from './ShopRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Store from "./redux/store.jsx";
import { loadSeller, loadUser } from './redux/actions/user.jsx';
import ProductDetailCard from './components/Route/ProductDetailCard/ProductDetailCard.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import SellerProtectedRoute from './routes/SellerProtectedRoute.jsx';
import { ShopDashboardPage, ShopCreateProduct, ShopAllProducts, ShopCreateEvents, ShopAllEvents, ShopAllCoupons, ShopPreviewPage } from './routes/ShopRoutes'
import { getAllEvents } from './redux/actions/event.jsx';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.STRIPE_API_KEY);



function App() {



  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllEvents());
    // Store.dispatch(getAllProducts());
  }, []);


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FaqPage />} />
        {/* Shop Routes */}
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        <Route path='/shop-create' element={<ShopCreatePage />} />
        <Route path='/shop-login' element={<ShopLoginPage />} />
        <Route path='/shop/:id' element={
          <SellerProtectedRoute  >
            <ShopHomePage />
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard' element={
          <SellerProtectedRoute  >
            <ShopDashboardPage />
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-create-product' element={
          <SellerProtectedRoute  >
            <ShopCreateProduct />
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-products' element={
          <SellerProtectedRoute  >
            <ShopAllProducts />
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-create-event' element={
          <SellerProtectedRoute  >
            <ShopCreateEvents />
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-events' element={
          <SellerProtectedRoute  >
            <ShopAllEvents />
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-coupons' element={
          <SellerProtectedRoute  >
            <ShopAllCoupons />
          </SellerProtectedRoute>
        } />



        <Route path="/payment" element={
          <ProtectedRoute>
            <Elements stripe={stripePromise}> <PaymentPage /> </Elements>
          </ProtectedRoute>
        }
        />


        {/* <Route path='/order/success/:id' element={<OrderSuccessPage />} /> */}


        <Route path='/checkout' element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  )
}

export default App
