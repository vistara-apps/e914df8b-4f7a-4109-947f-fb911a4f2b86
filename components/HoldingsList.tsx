'use client';

import { HoldingListItem } from './HoldingListItem';
import type { Holding, PriceData } from '../lib/types';

interface HoldingsListProps {
  holdings: Holding[];
  prices: PriceData;
  onRemove: (id: string) => void;
  isLoading: boolean;
}

export function HoldingsList({ holdings, prices, onRemove, isLoading }: HoldingsListProps) {
  if (holdings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Holdings</h2>
      {holdings.map((holding, index) => (
        <div
          key={holding.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <HoldingListItem
            holding={holding}
            currentPrice={prices[holding.assetSymbol.toLowerCase()]?.usd || 0}
            onRemove={() => onRemove(holding.id)}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
}
