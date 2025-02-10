import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { transfer } from '../actions/account';

export const Transfer = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    const data = await transfer(recipient, amount);
    if (data) {
      console.log(data);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold flex items-center">
        <Send className="w-6 h-6 mr-2" />
        Transfer
      </h3>
      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium">
            Recipient Account Number
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 rounded-md"
            placeholder="Enter recipient account number"j
            required
          />
        </div>
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
          className="w-full bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Transfer
        </button>
      </form>
    </div>
  );
};

