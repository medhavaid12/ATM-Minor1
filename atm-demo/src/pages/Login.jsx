import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../actions/auth'

export default function ATMLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    const formData = new FormData(event.currentTarget)

    try {
      const { token, user } = await login(
        formData.get('email'),
        formData.get('password')
      )
      if (token && user) {
        localStorage.setItem('token', token)
        navigate('/')
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 bg-gradient-to-br from-blue-900 to-blue-600">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-900">
        <div className="bg-blue-900 text-white p-6 text-center">
          <h1 className="text-2xl font-bold tracking-wide uppercase">
            Secure Banking Portal
          </h1>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 uppercase font-semibold tracking-wide disabled:opacity-50"
            >
              {isLoading ? 'Accessing Account...' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Forgot PIN?
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>First time user?
              <Link
                to="/register"
                className="ml-1 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Open an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}