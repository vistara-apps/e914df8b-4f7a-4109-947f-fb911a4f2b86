import type { Holding, PriceData, HoldingWithPnL } from './types';

export function calculateHoldingPnL(holding: Holding, currentPrice: number): HoldingWithPnL {
  const currentValue = holding.quantity * currentPrice;
  const totalCost = holding.quantity * holding.costBasisPerUnit;
  const pnl = currentValue - totalCost;
  const pnlPercentage = totalCost > 0 ? (pnl / totalCost) * 100 : 0;

  return {
    ...holding,
    currentPrice,
    currentValue,
    totalCost,
    pnl,
    pnlPercentage,
  };
}

export function calculateTotalPnL(holdings: Holding[], prices: PriceData): number {
  return holdings.reduce((total, holding) => {
    const currentPrice = prices[holding.assetSymbol.toLowerCase()]?.usd || 0;
    const currentValue = holding.quantity * currentPrice;
    const totalCost = holding.quantity * holding.costBasisPerUnit;
    return total + (currentValue - totalCost);
  }, 0);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getAssetIcon(symbol: string): string {
  // Using CoinGecko's asset icons
  const symbolMap: { [key: string]: string } = {
    'BTC': 'bitcoin',
    'ETH': 'ethereum',
    'USDC': 'usd-coin',
    'USDT': 'tether',
    'BNB': 'binancecoin',
    'ADA': 'cardano',
    'SOL': 'solana',
    'DOT': 'polkadot',
    'MATIC': 'matic-network',
    'AVAX': 'avalanche-2',
  };

  const coinId = symbolMap[symbol.toUpperCase()] || symbol.toLowerCase();
  return `https://assets.coingecko.com/coins/images/1/small/${coinId}.png`;
}
