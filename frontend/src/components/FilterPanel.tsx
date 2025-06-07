import React, { useState } from 'react';
import { Filter, Calendar, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';
import { FilterState } from '../types';
import { uniqueRegions, uniqueResourceTypes, uniqueLabels, uniqueTags } from '../data/mockData';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeSection: string; // Pass this prop from App
  resourceTypeLabel?: string; // Optional: pass the label for the current resource type
}

const resourceTypes = [
  'VM', 'GKE', 'SQL', 'Storage', 'LoadBalancer'
];
const regions = [
  'us-central1', 'europe-west1', 'asia-east1'
];
const labels = [
  'production', 'dev', 'test'
];
const tags = [
  'critical', 'zombie', 'legacy'
];
const dateRanges = [
  'Last 7 days', 'Last 30 days', 'Last year'
];

// --- Enhanced Dropdown for all filters ---
function Dropdown({ label, options, selected, onChange, boxClassName }: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  boxClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{left: number, top: number, width: number}>({left: 0, top: 0, width: 0});

  React.useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        left: rect.left,
        top: rect.bottom + window.scrollY,
        width: rect.width,
      });
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        className={`w-full flex items-center justify-between px-4 py-2 bg-white/60 dark:bg-gcp-800/60 border border-gcp-200 dark:border-gcp-700 rounded-md backdrop-blur-md shadow-lg text-gcp-700 dark:text-gcp-200 hover:bg-white/80 dark:hover:bg-gcp-700/80 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-150 ${open ? 'ring-2 ring-primary-400' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate font-medium text-base flex items-center gap-2">
          {label}
          {selected.length > 0 && (
            <span className="ml-2 bg-primary-100/70 dark:bg-primary-900/40 text-primary-700 dark:text-primary-200 rounded px-2 py-0.5 text-xs font-semibold">{selected.length}</span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && createPortal(
        <div
          ref={dropdownRef}
          className={`absolute z-[9999] mt-2 w-56
            bg-white/95
            dark:bg-gcp-900
            border border-gcp-200 dark:border-gcp-700
            rounded-md backdrop-blur-[18px] shadow-2xl max-h-64 overflow-auto animate-fade-in ring-1 ring-black/5
            ${boxClassName || ''}`}
          style={{
            left: dropdownPos.left,
            top: dropdownPos.top,
            width: dropdownPos.width,
            position: 'absolute',
          }}
        >
          {options.length === 0 && (
            <div className="px-4 py-2 text-gcp-400 text-sm">No options</div>
          )}
          {options.map(option => (
            <button
              key={option}
              className={`w-full flex items-center justify-between px-4 py-2 rounded hover:bg-primary-50/60 dark:hover:bg-primary-900/40 transition-colors duration-100 text-gcp-700 dark:text-gcp-200 text-sm ${selected.includes(option) ? 'bg-primary-100/70 dark:bg-primary-900/20 font-semibold' : ''}`}
              onClick={() => onChange(option)}
              type="button"
              tabIndex={0}
            >
              <span>{option}</span>
              {selected.includes(option) && <span className="text-primary-500 ml-2">✓</span>}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

// --- Enhanced DateRangeDropdown as a dropdown with quick ranges and custom range ---
function DateRangeDropdown({ label, value, onChange, boxClassName }: {
  label: string;
  value: { start: Date | null; end: Date | null };
  onChange: (range: { start: Date | null; end: Date | null }) => void;
  boxClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState<{ start: Date | null; end: Date | null }>(value);
  const [mode, setMode] = useState<'quick' | 'custom'>('quick');
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{left: number, top: number, width: number}>({left: 0, top: 0, width: 0});

  // Month/year state for calendar
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState<number>((tempRange.start || today).getMonth());
  const [calendarYear, setCalendarYear] = useState<number>((tempRange.start || today).getFullYear());

  React.useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        left: rect.left,
        top: rect.bottom + window.scrollY,
        width: rect.width,
      });
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function handleQuickSelect(range: string) {
    const today = new Date();
    let start: Date, end: Date;
    if (range === 'Last 7 days') {
      end = today;
      start = new Date(today);
      start.setDate(today.getDate() - 6);
    } else if (range === 'Last 30 days') {
      end = today;
      start = new Date(today);
      start.setDate(today.getDate() - 29);
    } else if (range === 'Last year') {
      end = today;
      start = new Date(today);
      start.setFullYear(today.getFullYear() - 1);
      start.setDate(start.getDate() + 1);
    } else {
      start = end = today;
    }
    setTempRange({ start, end });
    onChange({ start, end });
    setOpen(false);
  }

  function handleDateChange(date: Date) {
    if (!tempRange.start || (tempRange.start && tempRange.end)) {
      setTempRange({ start: date, end: null });
    } else if (tempRange.start && !tempRange.end) {
      if (date < tempRange.start) {
        setTempRange({ start: date, end: tempRange.start });
      } else {
        setTempRange({ start: tempRange.start, end: date });
      }
    }
  }

  function handleApply() {
    onChange(tempRange);
    setOpen(false);
  }

  function handleClear() {
    setTempRange({ start: null, end: null });
    onChange({ start: null, end: null });
    setOpen(false);
  }

  function formatRangeLabel() {
    if (value.start && value.end) {
      return `${value.start.toLocaleDateString()} - ${value.end.toLocaleDateString()}`;
    }
    if (value.start) {
      return `${value.start.toLocaleDateString()} - ...`;
    }
    return label;
  }

  // Month and year options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = Array.from({ length: 12 }, (_, i) => today.getFullYear() - 8 + i);

  // Calendar grid with month/year selection
  function CalendarGrid() {
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
    const days: Date[] = [];
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(calendarYear, calendarMonth, d));
    }
    const startDay = firstDay.getDay();

    return (
      <div>
        {/* Month/Year Selectors */}
        <div className="flex items-center justify-between mb-2">
          <button
            className="p-1 rounded hover:bg-gcp-100 dark:hover:bg-gcp-800"
            onClick={() => {
              if (calendarMonth === 0) {
                setCalendarMonth(11);
                setCalendarYear(y => y - 1);
              } else {
                setCalendarMonth(m => m - 1);
              }
            }}
            aria-label="Previous month"
            type="button"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <select
              className="bg-transparent text-base font-medium px-1 py-0.5 rounded hover:bg-gcp-100 dark:hover:bg-gcp-800 focus:outline-none"
              value={calendarMonth}
              onChange={e => setCalendarMonth(Number(e.target.value))}
            >
              {months.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>
            <select
              className="bg-transparent text-base font-medium px-1 py-0.5 rounded hover:bg-gcp-100 dark:hover:bg-gcp-800 focus:outline-none"
              value={calendarYear}
              onChange={e => setCalendarYear(Number(e.target.value))}
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <button
            className="p-1 rounded hover:bg-gcp-100 dark:hover:bg-gcp-800"
            onClick={() => {
              if (calendarMonth === 11) {
                setCalendarMonth(0);
                setCalendarYear(y => y + 1);
              } else {
                setCalendarMonth(m => m + 1);
              }
            }}
            aria-label="Next month"
            type="button"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {/* Days of week */}
        <div className="grid grid-cols-7 text-xs text-center text-gcp-400 mb-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>
        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1 p-2">
          {[...Array(startDay)].map((_, i) => <div key={i} />)}
          {days.map(day => {
            const isSelected = tempRange.start && tempRange.end && day >= tempRange.start && day <= tempRange.end;
            const isStart = tempRange.start && day.getTime() === tempRange.start.getTime();
            const isEnd = tempRange.end && day.getTime() === tempRange.end.getTime();
            return (
              <button
                key={day.toISOString()}
                className={`w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-primary-200 text-primary-900' : 'hover:bg-primary-100'}
                  ${isStart || isEnd ? 'bg-primary-500 text-white' : ''}`}
                onClick={() => handleDateChange(day)}
                type="button"
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        className={`w-full flex items-center justify-between px-4 py-2 bg-white/60 dark:bg-gcp-800/60 border border-gcp-200 dark:border-gcp-700 rounded-md backdrop-blur-md shadow-lg text-gcp-700 dark:text-gcp-200 hover:bg-white/80 dark:hover:bg-gcp-700/80 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-150 ${open ? 'ring-2 ring-primary-400' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="truncate font-medium text-base flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {formatRangeLabel()}
        </span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && createPortal(
        <div
          ref={dropdownRef}
          className={`absolute z-[9999] mt-2 w-80
            bg-white/95
            dark:bg-gcp-900
            border border-gcp-200 dark:border-gcp-700
            rounded-md backdrop-blur-[18px] shadow-2xl animate-fade-in ring-1 ring-black/5 p-4
            ${boxClassName || ''}`}
          style={{
            left: dropdownPos.left,
            top: dropdownPos.top,
            width: dropdownPos.width,
            position: 'absolute',
          }}
        >
          <div className="mb-2 text-sm font-medium text-gcp-700 dark:text-gcp-200 flex gap-2">
            <button
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${mode === 'quick' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200' : 'bg-gcp-100 dark:bg-gcp-800 text-gcp-700 dark:text-gcp-200'}`}
              onClick={() => setMode('quick')}
            >Quick Ranges</button>
            <button
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${mode === 'custom' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200' : 'bg-gcp-100 dark:bg-gcp-800 text-gcp-700 dark:text-gcp-200'}`}
              onClick={() => setMode('custom')}
            >Custom Range</button>
          </div>
          {mode === 'quick' ? (
            <div className="flex flex-col gap-2 mt-2">
              {['Last 7 days', 'Last 30 days', 'Last year'].map(r => (
                <button
                  key={r}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-primary-50/60 dark:hover:bg-primary-900/40 transition-colors text-gcp-700 dark:text-gcp-200 text-sm"
                  onClick={() => handleQuickSelect(r)}
                  type="button"
                >
                  {r}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-2 text-xs text-gcp-500 dark:text-gcp-400">Select start and end date</div>
              <CalendarGrid />
              <div className="flex justify-between mt-4">
                <button className="px-3 py-1 rounded bg-gcp-100 dark:bg-gcp-800 text-gcp-700 dark:text-gcp-200 text-xs font-medium hover:bg-gcp-200 dark:hover:bg-gcp-700" onClick={handleClear} type="button">Clear</button>
                <button className="px-3 py-1 rounded bg-primary-500 text-white text-xs font-medium hover:bg-primary-600" onClick={handleApply} type="button">Apply</button>
              </div>
            </>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

export function FilterPanel({ filters, onFiltersChange, activeSection, resourceTypeLabel }: FilterPanelProps) {
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>(() => {
    if (filters.dateRange) {
      const [start, end] = filters.dateRange.split('~');
      return {
        start: start ? new Date(start) : null,
        end: end ? new Date(end) : null,
      };
    }
    return { start: null, end: null };
  });

  const hasActiveFilters =
    filters.resourceType.length > 0 ||
    filters.region.length > 0 ||
    filters.label.length > 0 ||
    filters.tags.length > 0 ||
    (dateRange.start && dateRange.end);

  const clearAllFilters = () => {
    onFiltersChange({
      resourceType: [],
      region: [],
      label: [],
      tags: [],
      dateRange: '',
      search: filters.search,
    });
    setDateRange({ start: null, end: null });
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const currentValues = filters[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFiltersChange({
      ...filters,
      [category]: newValues,
    });
  };

  const handleDateRange = (range: { start: Date | null; end: Date | null }) => {
    setDateRange(range);
    if (range.start && range.end) {
      onFiltersChange({
        ...filters,
        dateRange: `${range.start.toISOString().slice(0, 10)}~${range.end.toISOString().slice(0, 10)}`,
      });
    } else {
      onFiltersChange({ ...filters, dateRange: '' });
    }
  };

  return (
    <div className="bg-white/70 dark:bg-gcp-900/70 border-b border-gcp-200 dark:border-gcp-700 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gcp-600 dark:text-gcp-400" />
          <span className="font-semibold text-gcp-700 dark:text-gcp-200 text-lg">Filters</span>
          {/* Active filter count badge */}
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200 text-xs font-semibold">{[filters.resourceType.length, filters.region.length, filters.label.length, filters.tags.length, dateRange.start && dateRange.end ? 1 : 0].reduce((a,b)=>a+b,0)}</span>
          )}
        </div>
        {/* Persistent Reset All button */}
        <button
          className="px-3 py-1 rounded-md bg-white/60 dark:bg-gcp-800/60 border border-gcp-200 dark:border-gcp-700 shadow-md backdrop-blur-md text-gcp-700 dark:text-gcp-200 text-sm font-medium hover:bg-gcp-100/80 dark:hover:bg-gcp-700/80 transition-colors flex items-center gap-1"
          onClick={clearAllFilters}
        >
          <X className="w-4 h-4" /> Reset All
        </button>
      </div>
      {/* Selected filters as chips */}
      {hasActiveFilters && (
        <div className="mb-3 flex flex-wrap gap-2">
          {[...filters.resourceType.map(f => ({ type: 'resourceType', value: f })),
            ...filters.region.map(f => ({ type: 'region', value: f })),
            ...filters.label.map(f => ({ type: 'label', value: f })),
            ...filters.tags.map(f => ({ type: 'tags', value: f })),
            ...(dateRange.start && dateRange.end ? [{ type: 'dateRange', value: `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}` }] : [])
          ].map((filter, index) => (
            <span
              key={filter.type + filter.value + index}
              className="flex items-center px-3 py-1 rounded bg-primary-100/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-200 text-xs font-medium gap-1 shadow-sm backdrop-blur-md border border-primary-200 dark:border-primary-800"
            >
              {filter.value}
              <button
                className="ml-1 text-primary-500 hover:text-primary-700 dark:hover:text-primary-100"
                onClick={() =>
                  filter.type === 'dateRange'
                    ? handleDateRange({ start: null, end: null })
                    : toggleFilter(filter.type as keyof FilterState, filter.value)
                }
                aria-label={`Remove ${filter.value}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {activeSection === 'overview' ? (
          <Dropdown
            label="Resource Type"
            options={resourceTypes}
            selected={filters.resourceType}
            onChange={v => toggleFilter('resourceType', v)}
            boxClassName="rounded-md border border-gcp-200 dark:border-gcp-700 shadow-xl bg-white/70 dark:bg-gcp-900/70 backdrop-blur-md"
          />
        ) : (
          <div className="flex items-center px-2 py-1 text-lg font-semibold text-gcp-700 dark:text-gcp-200">
            {resourceTypeLabel}
          </div>
        )}
        <Dropdown
          label="Region"
          options={regions}
          selected={filters.region}
          onChange={v => toggleFilter('region', v)}
          boxClassName="rounded-md border border-gcp-200 dark:border-gcp-700 shadow-xl bg-white/70 dark:bg-gcp-900/70 backdrop-blur-md"
        />
        <Dropdown
          label="Label"
          options={labels}
          selected={filters.label}
          onChange={v => toggleFilter('label', v)}
          boxClassName="rounded-md border border-gcp-200 dark:border-gcp-700 shadow-xl bg-white/70 dark:bg-gcp-900/70 backdrop-blur-md"
        />
        <Dropdown
          label="Tags"
          options={tags}
          selected={filters.tags}
          onChange={v => toggleFilter('tags', v)}
          boxClassName="rounded-md border border-gcp-200 dark:border-gcp-700 shadow-xl bg-white/70 dark:bg-gcp-900/70 backdrop-blur-md"
        />
        <DateRangeDropdown
          label="Date Range"
          value={dateRange}
          onChange={handleDateRange}
          boxClassName="rounded-md border border-gcp-200 dark:border-gcp-700 shadow-xl bg-white/70 dark:bg-gcp-900/70 backdrop-blur-md"
        />
      </div>
    </div>
  );
}