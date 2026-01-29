import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, SignUpPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FaqPage, ProductDetailPage, ProfilePage, ShopCreatePage } from './Routes.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Store from "./redux/store.jsx";
import { loadUser } from './redux/actions/user.jsx';
import { useSelector } from 'react-redux';
import ProductDetailCard from './components/Route/ProductDetailCard/ProductDetailCard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user)
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/activation/:activation_token' element={<ActivationPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/product/:name' element={<ProductDetailPage />} />
            <Route path='/best-selling' element={<BestSellingPage />} />
            <Route path='/events' element={<EventsPage />} />
            <Route path='/faq' element={<FaqPage />} />
            <Route path='/shop-create' element={<ShopCreatePage />} />
            {/* <Route path='/payment' element={<PaymentPage />} /> */}

            {/* <Route path='/order/success/:id' element={<OrderSuccessPage />} /> */}


            {/* <Route path='/checkout' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CheckoutPage />
              </ProtectedRoute>
            } /> */}
            <Route path='/profile' element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
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
      )}
    </>
  )
}

export default App
