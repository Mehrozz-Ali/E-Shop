import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from './pages/SignupPage.jsx'
import ActivationPage from './pages/ActivationPage.jsx'
// import Hello from './Routes.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Hello />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
