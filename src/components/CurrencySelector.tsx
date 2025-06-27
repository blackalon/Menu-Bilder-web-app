import React from 'react';
import { Currency } from '../types/menu';
import { currencies } from '../data/currencies';
import { DollarSign } from 'lucide-react';

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  showFlag: boolean;
  onShowFlagChange: (show: boolean) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
  showFlag,
  onShowFlagChange
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-blue-500" />
        إعدادات العملة
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اختر العملة
          </label>
          <select
            value={selectedCurrency.code}
            onChange={(e) => {
              const currency = currencies.find(c => c.code === e.target.value);
              if (currency) onCurrencyChange(currency);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showFlag}
              onChange={(e) => onShowFlagChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              عرض علم العملة في المنيو
            </span>
          </label>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          معاينة: {showFlag && selectedCurrency.flag} {selectedCurrency.symbol} 25.00
        </p>
      </div>
    </div>
  );
};