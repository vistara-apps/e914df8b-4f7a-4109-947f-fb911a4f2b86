'use client';

import { useState, useEffect } from 'react';
import type { Holding } from '../types';
import { generateId } from '../utils';

const STORAGE_KEY = 'crypto-pnl-holdings';

export function useHoldings() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load holdings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedHoldings = JSON.parse(stored);
        setHoldings(parsedHoldings);
      }
    } catch (error) {
      console.error('Error loading holdings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save holdings to localStorage whenever holdings change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings));
      } catch (error) {
        console.error('Error saving holdings:', error);
      }
    }
  }, [holdings, isLoading]);

  const addHolding = (holdingData: Omit<Holding, 'id'>) => {
    const newHolding: Holding = {
      ...holdingData,
      id: generateId(),
    };
    setHoldings(prev => [...prev, newHolding]);
  };

  const removeHolding = (id: string) => {
    setHoldings(prev => prev.filter(holding => holding.id !== id));
  };

  const updateHolding = (id: string, updates: Partial<Holding>) => {
    setHoldings(prev =>
      prev.map(holding =>
        holding.id === id ? { ...holding, ...updates } : holding
      )
    );
  };

  return {
    holdings,
    addHolding,
    removeHolding,
    updateHolding,
    isLoading,
  };
}
