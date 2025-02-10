import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAccount, sendOTP, verifyOTP } from '../actions/account';
import Account from '../components/Account';
import { LogOut } from 'lucide-react';

export default function Home() {
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [pin, setPin] = useState('')
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await verifyOTP(pin);
    if (data.verified) {
      setIsPinVerified(true)
    }
  }

  const isSetup = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/account', {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('token')
        },
      })
      const data = await response.json()
      if (!data.accountNumber) {
        navigate('/setup')
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    isSetup()
    if (!isPinVerified) {
      sendOTP()
    }
    if (isPinVerified) {
      (async () => {
        const accountData = await getAccount()
        setUserData(accountData)
      })()
    }
  }, [isPinVerified])



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl">
        <div className="p-8">
          <div className='flex justify-between items-center mb-6'>
            <h1 className="text-3xl font-bold text-gray-800">ATM Dashboard</h1>
            <button onClick={() => {
              localStorage.removeItem('token')
              navigate('/login')
            }
            } className='bg-red-500 text-white px-4 py-2 rounded flex items-center'>
                <LogOut className='w-6 h-6 mr-2' />Logout</button>

          </div>
          {isPinVerified ? (
            <Account userData={userData} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="pin"
                    name="pin"
                    required
                    maxLength={4}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                  <span className='text-sm text-gray-600'>*OTP sent to your mail successfully</span>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Verify OTP
                </button>
              </div>
            </form>)}
        </div>
      </div>
    </div>
  )
}

