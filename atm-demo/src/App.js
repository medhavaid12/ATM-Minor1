import Login from './pages/Login'
import UserRegister from './pages/UserRegister'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import AccountSetupForm from './components/AccountSetup'
import Home from './pages/Home'



export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/setup" element={<AccountSetupForm />} />
      </Routes>
    </Router>
  )
}

