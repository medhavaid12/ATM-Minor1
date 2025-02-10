import React, { useState } from 'react';
import { IndianRupee } from 'lucide-react';
import { withdraw } from '../actions/account';

export const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // For showing the success message
  const [loading, setLoading] = useState(false); // For showing the loader

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (amount % 500 !== 0) {
      setLoading(false);
      setError('Amount must be in multiples of 500');
      return;
    }

    const data = await withdraw(amount);
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
      <h3 className="text-2xl font-semibold flex items-center">
        <IndianRupee className="w-6 h-6 mr-2" />
        Withdraw
      </h3>
      {loading && (
        <div className="flex items-center justify-center space-x-2 text-indigo-800">
          <div className="loader w-6 h-6 border-4 border-t-indigo-500 rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      )}
      {success && (
        <div className="text-green-500 text-sm font-bold">
          🎉 Congratulations! Amount withdrawn successfully.
        </div>
      )}
      <form onSubmit={handleWithdraw} className="space-y-4">
        <div className="text-blue-500 text-sm font-bold">
          Note Denominations: ₹500 (Only)
        </div>
        {error && (
          <div className="text-red-500 text-sm font-bold">{error}</div>
        )}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium">
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
          className={`w-full text-white font-bold py-2 px-4 rounded ${
            loading ? 'bg-indigo-500' : 'bg-indigo-800 hover:bg-indigo-700'
          }`}
        >
          Withdraw
        </button>
      </form>
    </div>
  );
};
