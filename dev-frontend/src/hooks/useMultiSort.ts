import { useState, useMemo } from 'react';
import type { ZombieResource, SortConfig } from '../types';

// Placeholder for useMultiSort hook
export function useMultiSort(data: ZombieResource[]) {
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([]);

  const handleSort = (key: keyof ZombieResource, isShiftClick: boolean = false) => {
    setSortConfigs(prev => {
      if (!isShiftClick) {
        const existing = prev.find(cfg => cfg.key === key);
        if (existing) {
          return [{ key, direction: existing.direction === 'asc' ? 'desc' : 'asc' }];
        }
        return [{ key, direction: 'asc' }];
      } else {
        const existing = prev.find(cfg => cfg.key === key);
        if (existing) {
          return prev.map(cfg =>
            cfg.key === key
              ? { ...cfg, direction: cfg.direction === 'asc' ? 'desc' : 'asc' }
              : cfg
          );
        }
        return [...prev, { key, direction: 'asc' }];
      }
    });
  };

  const handleSortString = (key: string, isShiftClick: boolean = false) => {
    handleSort(key as keyof ZombieResource, isShiftClick);
  };

  const sortedData = useMemo(() => {
    if (sortConfigs.length === 0) return data;
    return [...data].sort((a, b) => {
      for (const config of sortConfigs) {
        if (!config.key) continue;
        const aValue = a[config.key];
        const bValue = b[config.key];
        if (aValue < bValue) return config.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return config.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfigs]);

  const getSortIndicator = (columnKey: keyof ZombieResource) => {
    const config = sortConfigs.find(cfg => cfg.key === columnKey);
    if (!config) return null;
    return {
      direction: config.direction,
      priority: sortConfigs.length > 1 ? sortConfigs.findIndex(cfg => cfg.key === columnKey) + 1 : null,
    };
  };

  const clearSort = () => setSortConfigs([]);

  return {
    sortedData,
    handleSort: handleSortString,
    getSortIndicator,
    clearSort,
    sortConfigs,
  };
}
