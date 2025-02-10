import { useState, useEffect } from 'react';

export const CurrencyConverter = () => {
  const [conversionRates, setConversionRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('INR');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const fetchConversionRates = async (base) => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/f9f60799c7fefa844462b8f9/latest/${base}`
      );
      const data = await response.json();
      if (data.result === 'success') {
        setConversionRates(data.conversion_rates);
        setError('');
      } else {
        setError('Failed to fetch conversion rates');
      }
    } catch (err) {
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    fetchConversionRates(baseCurrency);
  }, [baseCurrency]);

  const handleConvert = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }
    if (!conversionRates[targetCurrency]) {
      setError('Invalid target currency');
      return;
    }
    setError('');
    const conversionRate = conversionRates[targetCurrency];
    setResult((amount * conversionRate).toFixed(2));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-center">Currency Converter</h3>
      {error && <div className="text-red-500 text-sm font-bold">{error}</div>}
      <form onSubmit={handleConvert} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 rounded-md border shadow-sm"
            placeholder="Enter amount"
            required
          />
        </div>
        <div>
          <label htmlFor="baseCurrency" className="block text-sm font-medium">
            Base Currency
          </label>
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 rounded-md border shadow-sm"
            required
          >
            {Object.keys(conversionRates).length > 0 &&
              Object.keys(conversionRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="targetCurrency" className="block text-sm font-medium">
            Target Currency
          </label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white text-gray-900 rounded-md border shadow-sm"
            required
          >
            {Object.keys(conversionRates).length > 0 &&
              Object.keys(conversionRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Convert
        </button>
      </form>
      {result && (
        <div className="text-green-500 text-2xl font-bold text-center">
          {amount} {baseCurrency} = {result} {targetCurrency}
        </div>
      )}
    </div>
  );
};
