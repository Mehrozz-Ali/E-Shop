import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/LoginPage.jsx"
import SignUp from './pages/SignUpPage.jsx'
import Hello from './Routes.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Hello />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
