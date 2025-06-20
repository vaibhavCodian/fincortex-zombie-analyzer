import React, { useState } from 'react';
import { mockUser, mockGcpScopes } from '../data/mockSettings';
import { useTheme } from '../hooks/useTheme';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [scanFrequency, setScanFrequency] = useState('daily');

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* User Info */}
      <div className="flex items-center gap-4 p-4 bg-gcp-50 dark:bg-gcp-800/40 rounded-lg border border-gcp-100 dark:border-gcp-700 mb-4">
        <img src={mockUser.avatar} alt="User avatar" className="w-14 h-14 rounded-full border border-gcp-200 dark:border-gcp-700" />
        <div>
          <div className="text-title-medium text-gcp-900 dark:text-gcp-100 font-semibold">{mockUser.name}</div>
          <div className="text-body-medium text-gcp-700 dark:text-gcp-300">{mockUser.email}</div>
          <div className="text-body-small text-gcp-500 dark:text-gcp-400 mt-1">GCP Project: <span className="font-mono">{mockUser.gcpProject}</span></div>
          <div className="text-body-small text-gcp-500 dark:text-gcp-400">GCP Account: <span className="font-mono">{mockUser.gcpAccount}</span></div>
        </div>
      </div>

      {/* GCP Auth Scopes */}
      <div className="mb-6">
        <label className="block font-medium mb-2">GCP Auth Scopes</label>
        <ul className="space-y-2">
          {mockGcpScopes.map(scope => (
            <li key={scope.scope} className="p-3 rounded border border-gcp-100 dark:border-gcp-700 bg-white/70 dark:bg-gcp-900/40">
              <div className="font-mono text-xs text-primary-700 dark:text-primary-300 break-all">{scope.scope}</div>
              <div className="text-body-small text-gcp-600 dark:text-gcp-400 mt-1">{scope.description}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme Selection */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Theme</label>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 border ${theme === 'light' ? 'bg-primary-500 text-white' : 'bg-white text-gcp-900'} rounded-none`}
            onClick={() => setTheme('light')}
          >
            Light
          </button>
          <button
            className={`px-4 py-2 border ${theme === 'dark' ? 'bg-primary-500 text-white' : 'bg-white text-gcp-900'} rounded-none`}
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Notification Toggle */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Agent Notifications</label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications((n) => !n)}
          className="mr-2"
        />
        <span>{notifications ? 'Enabled' : 'Disabled'}</span>
      </div>

      {/* Agent Scan Preferences */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Agent Scan Preferences</label>
        <div className="flex items-center gap-4 mb-2">
          <input
            type="checkbox"
            checked={autoScan}
            onChange={() => setAutoScan((a) => !a)}
            className="mr-2"
          />
          <span>Enable Auto-Scan</span>
        </div>
        <label className="block mb-1">Scan Frequency</label>
        <select
          value={scanFrequency}
          onChange={e => setScanFrequency(e.target.value)}
          className="border px-3 py-2 rounded-none"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
    </div>
  );
}
