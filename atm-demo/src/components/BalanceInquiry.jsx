import React, { useEffect, useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { getAccount } from '../actions/account';

export const BalanceInquiry = () => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await getAccount();
      setBalance(data.balance);
      setIsLoading(false);
    })();
  }, []);
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold flex items-center text-gray-800">
        <FileText className="w-6 h-6 mr-2" />
        Balance Inquiry
      </h3>
      {
        isLoading ? <p className="text-gray-800">
          <Loader2 className="animate-spin w-6 h-6 mr-2" />
        </p> :
          <p className="text-3xl font-bold text-gray-800">₹{balance}</p>
      }
    </div>
  );
};

