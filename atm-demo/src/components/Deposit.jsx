import React, { useState } from 'react';
import { PiggyBank } from 'lucide-react';
import { deposit } from '../actions/account';

export const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (amount % 500 !== 0) {
      setLoading(false);
      setError('Amount must be in multiples of 500');
      return;
    }

    const data = await deposit(amount);
    setLoading(false);

    if (data.error) {
      setError(data.error);
      return;
    }

    setAmount('');
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold flex items-center ">
        <PiggyBank className="w-6 h-6 mr-2" />
        Deposit
      </h3>
      {loading && (
        <div className="flex items-center justify-center space-x-2 text-indigo-800">
          <div className="loader w-6 h-6 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      )}
      {success && (
        <div className="text-green-500 text-sm font-bold">
          🎉 Congratulations! Amount deposited successfully.
        </div>
      )}
      <form onSubmit={handleDeposit} className="space-y-4">
        <div className="text-blue-500 text-sm font-bold">
          Note Acceptance: ₹500 (Only)
        </div>
        {error && (
          <div className="text-red-500 text-sm font-bold">{error}</div>
        )}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium ">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 rounded-md"
            placeholder="Enter amount"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-bold py-2 px-4 rounded ${loading ? 'bg-indigo-500' : 'bg-indigo-800 hover:bg-indigo-700'
            }`}
        >
          Deposit
        </button>
      </form>
    </div>
  );
};
