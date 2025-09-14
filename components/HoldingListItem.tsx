'use client';

import { useState } from 'react';
import { calculateHoldingPnL, formatCurrency, formatPercentage, getAssetIcon } from '../lib/utils';
import type { Holding } from '../lib/types';

interface HoldingListItemProps {
  holding: Holding;
  currentPrice: number;
  onRemove: () => void;
  isLoading: boolean;
}

export function HoldingListItem({ holding, currentPrice, onRemove, isLoading }: HoldingListItemProps) {
  const [showActions, setShowActions] = useState(false);
  
  const holdingWithPnL = calculateHoldingPnL(holding, currentPrice);
  const isProfit = holdingWithPnL.pnl >= 0;

  return (
    <div className="bg-surface rounded-lg shadow-card p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <img
              src={getAssetIcon(holding.assetSymbol)}
              alt={holding.assetSymbol}
              className="w-6 h-6"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling!.textContent = holding.assetSymbol.charAt(0);
              }}
            />
            <span className="text-xs font-medium text-text-secondary hidden">
              {holding.assetSymbol.charAt(0)}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-text-primary">{holding.assetSymbol}</h3>
              <button
                onClick={() => setShowActions(!showActions)}
                className="text-text-secondary hover:text-text-primary transition-colors duration-200"
                aria-label="More actions"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-text-secondary">
              {holding.quantity} {holding.assetSymbol}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
          ) : (
            <>
              <p className={`font-medium ${isProfit ? 'text-profit' : 'text-loss'}`}>
                {formatCurrency(holdingWithPnL.currentValue)}
              </p>
              <p className={`text-sm ${isProfit ? 'text-profit' : 'text-loss'}`}>
                {formatPercentage(holdingWithPnL.pnlPercentage)}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Expanded details */}
      {showActions && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-text-secondary">Cost Basis</p>
              <p className="text-sm font-medium">{formatCurrency(holding.costBasisPerUnit)}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Current Price</p>
              <p className="text-sm font-medium">
                {isLoading ? '...' : formatCurrency(currentPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Total Cost</p>
              <p className="text-sm font-medium">{formatCurrency(holdingWithPnL.totalCost)}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">P&L</p>
              <p className={`text-sm font-medium ${isProfit ? 'text-profit' : 'text-loss'}`}>
                {formatCurrency(holdingWithPnL.pnl)}
              </p>
            </div>
          </div>
          
          <button
            onClick={onRemove}
            className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-100 transition-colors duration-200"
          >
            Remove Holding
          </button>
        </div>
      )}
    </div>
  );
}
