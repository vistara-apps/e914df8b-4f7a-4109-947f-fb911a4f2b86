'use client';

import { useState, useEffect } from 'react';
import { HoldingsList } from '../components/HoldingsList';
import { InputForm } from '../components/InputForm';
import { Modal } from '../components/Modal';
import { ProfitChart } from '../components/ProfitChart';
import { useHoldings } from '../lib/hooks/useHoldings';
import { usePrices } from '../lib/hooks/usePrices';
import { calculateTotalPnL } from '../lib/utils';
import type { Holding } from '../lib/types';

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { holdings, addHolding, removeHolding, isLoading: holdingsLoading } = useHoldings();
  const { prices, isLoading: pricesLoading } = usePrices(holdings);

  const totalPnL = calculateTotalPnL(holdings, prices);
  const isProfit = totalPnL >= 0;

  const handleAddHolding = (holding: Omit<Holding, 'id'>) => {
    addHolding(holding);
    setShowAddModal(false);
  };

  // Show onboarding if no holdings
  if (!holdingsLoading && holdings.length === 0) {
    return (
      <div className="min-h-screen bg-bg px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-text-primary mb-2">
              Crypto P&L Glance
            </h1>
            <p className="text-text-secondary">
              Track your crypto profit & loss with privacy
            </p>
          </div>

          <div className="bg-surface rounded-lg shadow-card p-6 text-center mb-6">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Welcome to P&L Glance
            </h2>
            <p className="text-text-secondary mb-6">
              Add your first crypto holding to start tracking your portfolio&apos;s performance.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Add First Holding
            </button>
          </div>

          <div className="bg-surface rounded-lg shadow-card p-4">
            <h3 className="font-medium text-text-primary mb-2">Privacy First</h3>
            <p className="text-sm text-text-secondary">
              Your data stays on your device. We only fetch public price data to calculate your P&amp;L.
            </p>
          </div>
        </div>

        {showAddModal && (
          <Modal onClose={() => setShowAddModal(false)}>
            <InputForm
              onSubmit={handleAddHolding}
              onCancel={() => setShowAddModal(false)}
            />
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-text-primary">Portfolio</h1>
            <p className="text-sm text-text-secondary">Real-time P&L tracking</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity duration-200"
            aria-label="Add holding"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Total P&L Card */}
        <div className="bg-surface rounded-lg shadow-card p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-text-secondary mb-1">
                {isProfit ? 'Profit' : 'Loss'}
              </p>
              <p className={`text-2xl font-semibold ${
                isProfit ? 'text-profit' : 'text-loss'
              }`}>
                {pricesLoading ? '...' : `$${Math.abs(totalPnL).toLocaleString()}`}
              </p>
            </div>
            <div className={`text-sm font-medium px-2 py-1 rounded ${
              isProfit ? 'bg-green-100 text-profit' : 'bg-red-100 text-loss'
            }`}>
              {isProfit ? '+' : '-'}{Math.abs(totalPnL / 100).toFixed(2)}%
            </div>
          </div>
          
          <ProfitChart isProfit={isProfit} />
        </div>

        {/* Holdings List */}
        <HoldingsList
          holdings={holdings}
          prices={prices}
          onRemove={removeHolding}
          isLoading={pricesLoading}
        />

        {/* Add Holding Modal */}
        {showAddModal && (
          <Modal onClose={() => setShowAddModal(false)}>
            <InputForm
              onSubmit={handleAddHolding}
              onCancel={() => setShowAddModal(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
