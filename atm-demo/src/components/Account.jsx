import React, { useState } from 'react';
import { DollarSign, PiggyBank, Send, FileText } from 'lucide-react';
import { Withdraw } from './CashWithdraw';
import { Deposit } from './Deposit';
import { Transfer } from './FundTransfer';
import { BalanceInquiry } from './BalanceInquiry';
import { CurrencyConverter } from './CurrencyConverter';

const Account = ({ userData }) => {
  const [activeView, setActiveView] = useState('Account Details');


  const atmOptions = [
    { icon: <DollarSign className="w-6 h-6" />, label: 'Withdraw', component: <Withdraw /> },
    { icon: <PiggyBank className="w-6 h-6" />, label: 'Deposit', component: <Deposit /> },
    { icon: <Send className="w-6 h-6" />, label: 'Transfer', component: <Transfer /> },
    { icon: <FileText className="w-6 h-6" />, label: 'Balance Inquiry', component: <BalanceInquiry /> },
  ];



  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-500 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Account Number</h2>
          <p className="text-4xl font-bold">{userData?.accountNumber}</p>
        </div>
        <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-2">ATM Options</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {atmOptions.map((option, index) => (
              <button
                onClick={() => setActiveView(option.label)}
                key={index}
                className="flex items-center justify-center bg-indigo-800 hover:bg-indigo-700 transition-colors duration-200 p-3 rounded-lg"
              >
                {option.icon}
                <span className="ml-2">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 rounded-xl shadow-md space-y-4">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveView('Account Details')}
            className={`px-4 py-2 rounded ${activeView === 'Account Details' ? 'bg-indigo-800 text-white' : 'bg-indigo-700 text-indigo-200'
              }`}
          >
            Account Details
          </button>
          {atmOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setActiveView(option.label)}
              className={`px-4 py-2 rounded ${activeView === option.label ? 'bg-indigo-800 text-white' : 'bg-indigo-700 text-indigo-200'
                }`}
            >
              {option.label}
            </button>
          ))}
           <button
            onClick={() => setActiveView('Currency Exchange')}
            className={`px-4 py-2 rounded ${activeView === 'Currency Exchange' ? 'bg-indigo-800 text-white' : 'bg-indigo-700 text-indigo-200'
              }`}
          >
            Currency Exchange
          </button>
        </div>
        {activeView === 'Account Details' ? (
          <div className="text-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Account Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-800">Bank Name</p>
                <p className="text-lg font-medium">{userData?.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-800">Account Type</p>
                <p className="text-lg font-medium">{userData?.accountType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-800">Created</p>
                <p className="text-lg font-medium">
                  {new Date(userData?.createdAt).toDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-800">Last Updated</p>
                <p className="text-lg font-medium">
                  {new Date(userData?.updatedAt).toDateString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          atmOptions.find((option) => option.label === activeView)?.component
        )}

        {
          activeView === 'Currency Exchange' && (
            <CurrencyConverter />
          )
        }
      </div>
    </div>
  );
};

export default Account;

