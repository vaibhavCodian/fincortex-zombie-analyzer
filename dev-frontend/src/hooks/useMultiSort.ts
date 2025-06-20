import { useState, useMemo } from 'react';
import { ZombieResource } from '../types';

export interface SortConfig {
  key: keyof ZombieResource;
  direction: 'asc' | 'desc';
}

export function useMultiSort(data: ZombieResource[]) {
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([]);

  const handleSort = (key: keyof ZombieResource, isShiftClick: boolean = false) => {
    setSortConfigs(prev => {
      if (!isShiftClick) {
        // Single column sort
        const existingSort = prev.find(config => config.key === key);
        if (existingSort) {
          return [{
            key,
            direction: existingSort.direction === 'asc' ? 'desc' : 'asc'
          }];
        }
        return [{ key, direction: 'asc' }];
      } else {
        // Multi-column sort
        const existingIndex = prev.findIndex(config => config.key === key);
        if (existingIndex >= 0) {
          const newConfigs = [...prev];
          newConfigs[existingIndex] = {
            key,
            direction: prev[existingIndex].direction === 'asc' ? 'desc' : 'asc'
          };
          return newConfigs;
        }
        return [...prev, { key, direction: 'asc' }];
      }
    });
  };

  // Overload for compatibility with SortableHeader (string key)
  const handleSortString = (key: string, isShiftClick: boolean = false) => {
    handleSort(key as keyof ZombieResource, isShiftClick);
  };

  const sortedData = useMemo(() => {
    if (sortConfigs.length === 0) return data;

    return [...data].sort((a, b) => {
      for (const config of sortConfigs) {
        const aVal = a[config.key];
        const bVal = b[config.key];
        
        let comparison = 0;
        
        // Handle different data types
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          comparison = aVal.localeCompare(bVal);
        } else if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal;
        } else if (config.key === 'lastActive') {
          const aDate = new Date(aVal as string);
          const bDate = new Date(bVal as string);
          comparison = aDate.getTime() - bDate.getTime();
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }
        
        if (comparison !== 0) {
          return config.direction === 'asc' ? comparison : -comparison;
        }
      }
      return 0;
    });
  }, [data, sortConfigs]);

  const getSortIndicator = (columnKey: keyof ZombieResource) => {
    const sortIndex = sortConfigs.findIndex(config => config.key === columnKey);
    if (sortIndex === -1) return null;
    
    return {
      direction: sortConfigs[sortIndex].direction,
      priority: sortConfigs.length > 1 ? sortIndex + 1 : null
    };
  };

  const clearSort = () => {
    setSortConfigs([]);
  };

  return {
    sortedData,
    handleSort: handleSortString,
    getSortIndicator,
    clearSort,
    sortConfigs,
  };
}