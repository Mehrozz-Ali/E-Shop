import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, SignUpPage, ActivationPage } from './Routes.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';  
import server from './server';
import { toast } from 'react-toastify';

function App() {
  useEffect(() => {
    axios.get(`${server}/user/getuser`, { withCredentials: true }).then((res) => {
      toast.success(res.data.message);
    }).catch((err) => {
      toast.error(err.response.data.message);
    })
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/activation/:activation_token' element={<ActivationPage />} />
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
    </>
  )
}

export default App
