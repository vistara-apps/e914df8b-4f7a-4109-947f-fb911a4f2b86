'use client';

import { useState, useEffect } from 'react';
import type { Holding, PriceData } from '../types';

const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price';
const CACHE_DURATION = 60000; // 1 minute

interface CacheEntry {
  data: PriceData;
  timestamp: number;
}

let priceCache: CacheEntry | null = null;

export function usePrices(holdings: Holding[]) {
  const [prices, setPrices] = useState<PriceData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (holdings.length === 0) {
      setPrices({});
      return;
    }

    const fetchPrices = async () => {
      // Check cache first
      if (priceCache && Date.now() - priceCache.timestamp < CACHE_DURATION) {
        setPrices(priceCache.data);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const symbols = [...new Set(holdings.map(h => h.assetSymbol.toLowerCase()))];
        const ids = symbols.join(',');
        
        const response = await fetch(
          `${COINGECKO_API}?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch prices: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Update cache
        priceCache = {
          data,
          timestamp: Date.now(),
        };

        setPrices(data);
      } catch (err) {
        console.error('Error fetching prices:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch prices');
        
        // Use cached data if available, even if expired
        if (priceCache) {
          setPrices(priceCache.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();

    // Set up interval to refresh prices
    const interval = setInterval(fetchPrices, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [holdings]);

  return { prices, isLoading, error };
}
