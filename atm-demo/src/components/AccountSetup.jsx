import React, { useEffect, useState } from 'react';
import { setupAccount } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const AccountSetupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountNumber: '',
    balance: '',
    accountType: '', otp: '',

    bankName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await setupAccount(
      formData.accountNumber,
      formData.accountType,
      formData.balance,
      formData.bankName,
    );
    if (data.accountNumber) {
      navigate('/');
      alert('Account setup successful');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set Up Your Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="accountNumber" className="sr-only">Account Number</label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="balance" className="sr-only">Initial Balance</label>
              <input
                id="balance"
                name="balance"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Initial Balance"
                value={formData.balance}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="accountType" className="sr-only">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.accountType}
                onChange={handleChange}
              >
                <option value="">Select Account Type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div>
              <label htmlFor="bankName" className="sr-only">Bank Name</label>
              <input
                id="bankName"
                name="bankName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Set Up Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetupForm;

