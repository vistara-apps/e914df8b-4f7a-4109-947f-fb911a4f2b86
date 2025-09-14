'use client';

import { useState } from 'react';
import type { Holding } from '../lib/types';

interface InputFormProps {
  onSubmit: (holding: Omit<Holding, 'id'>) => void;
  onCancel: () => void;
}

const POPULAR_ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'USDC', name: 'USD Coin' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'MATIC', name: 'Polygon' },
  { symbol: 'AVAX', name: 'Avalanche' },
];

export function InputForm({ onSubmit, onCancel }: InputFormProps) {
  const [formData, setFormData] = useState({
    assetSymbol: '',
    quantity: '',
    costBasisPerUnit: '',
    transactionDate: new Date().toISOString().split('T')[0],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.assetSymbol.trim()) {
      newErrors.assetSymbol = 'Asset symbol is required';
    }

    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!formData.costBasisPerUnit || parseFloat(formData.costBasisPerUnit) <= 0) {
      newErrors.costBasisPerUnit = 'Cost basis must be greater than 0';
    }

    if (!formData.transactionDate) {
      newErrors.transactionDate = 'Transaction date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const holding: Omit<Holding, 'id'> = {
        assetSymbol: formData.assetSymbol.toUpperCase().trim(),
        quantity: parseFloat(formData.quantity),
        costBasisPerUnit: parseFloat(formData.costBasisPerUnit),
        transactionDate: formData.transactionDate,
      };

      onSubmit(holding);
    } catch (error) {
      console.error('Error adding holding:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssetSelect = (symbol: string) => {
    setFormData(prev => ({ ...prev, assetSymbol: symbol }));
    setErrors(prev => ({ ...prev, assetSymbol: '' }));
  };

  return (
    <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Add Holding</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Asset Symbol */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Asset Symbol
          </label>
          <input
            type="text"
            value={formData.assetSymbol}
            onChange={(e) => setFormData(prev => ({ ...prev, assetSymbol: e.target.value }))}
            placeholder="e.g., BTC, ETH"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.assetSymbol ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.assetSymbol && (
            <p className="text-red-500 text-sm mt-1">{errors.assetSymbol}</p>
          )}
          
          {/* Popular assets */}
          <div className="mt-2">
            <p className="text-xs text-text-secondary mb-2">Popular assets:</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_ASSETS.map((asset) => (
                <button
                  key={asset.symbol}
                  type="button"
                  onClick={() => handleAssetSelect(asset.symbol)}
                  className="px-2 py-1 text-xs bg-gray-100 text-text-secondary rounded hover:bg-gray-200 transition-colors duration-200"
                >
                  {asset.symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Quantity
          </label>
          <input
            type="number"
            step="any"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
            placeholder="0.00"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.quantity ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>

        {/* Cost Basis */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Cost Basis per Unit (USD)
          </label>
          <input
            type="number"
            step="any"
            value={formData.costBasisPerUnit}
            onChange={(e) => setFormData(prev => ({ ...prev, costBasisPerUnit: e.target.value }))}
            placeholder="0.00"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.costBasisPerUnit ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.costBasisPerUnit && (
            <p className="text-red-500 text-sm mt-1">{errors.costBasisPerUnit}</p>
          )}
        </div>

        {/* Transaction Date */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Transaction Date
          </label>
          <input
            type="date"
            value={formData.transactionDate}
            onChange={(e) => setFormData(prev => ({ ...prev, transactionDate: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.transactionDate ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.transactionDate && (
            <p className="text-red-500 text-sm mt-1">{errors.transactionDate}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-text-secondary rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Holding'}
          </button>
        </div>
      </form>
    </div>
  );
}
