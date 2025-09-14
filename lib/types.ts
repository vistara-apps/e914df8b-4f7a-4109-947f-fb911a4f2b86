export interface Holding {
  id: string;
  assetSymbol: string;
  quantity: number;
  costBasisPerUnit: number;
  transactionDate: string;
}

export interface PriceData {
  [symbol: string]: {
    usd: number;
  };
}

export interface HoldingWithPnL extends Holding {
  currentPrice: number;
  currentValue: number;
  totalCost: number;
  pnl: number;
  pnlPercentage: number;
}
