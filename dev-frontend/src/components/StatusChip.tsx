import { CheckCircle, XCircle, AlertCircle, Clock, Server } from 'lucide-react';
import clsx from 'clsx';

interface StatusChipProps {
  status: 'Running' | 'Stopped' | 'Inactive' | 'Available' | 'Error';
  size?: 'sm' | 'md';
}

const statusConfig = {
  Running: {
    icon: CheckCircle,
    bgColor: 'bg-success-100 dark:bg-success-900/20',
    textColor: 'text-success-700 dark:text-success-300',
    iconColor: 'text-success-500',
  },
  Stopped: {
    icon: XCircle,
    bgColor: 'bg-gcp-100 dark:bg-gcp-800',
    textColor: 'text-gcp-700 dark:text-gcp-300',
    iconColor: 'text-gcp-500',
  },
  Inactive: {
    icon: Clock,
    bgColor: 'bg-warning-100 dark:bg-warning-900/20',
    textColor: 'text-warning-700 dark:text-warning-300',
    iconColor: 'text-warning-500',
  },
  Available: {
    icon: Server,
    bgColor: 'bg-primary-100 dark:bg-primary-900/20',
    textColor: 'text-primary-700 dark:text-primary-300',
    iconColor: 'text-primary-500',
  },
  Error: {
    icon: AlertCircle,
    bgColor: 'bg-error-100 dark:bg-error-900/20',
    textColor: 'text-error-700 dark:text-error-300',
    iconColor: 'text-error-500',
  },
};

export function StatusChip({ status, size = 'md' }: StatusChipProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  // Add shadow/glow for active states
  const isActive = status === 'Running' || status === 'Available';
  return (
    <span className={clsx(
      'inline-flex items-center rounded-full font-medium transition-all duration-200',
      config.bgColor,
      config.textColor,
      {
        'px-2 py-1 text-label-small': size === 'sm',
        'px-3 py-1.5 text-label-medium': size === 'md',
        'shadow-md ring-2 ring-primary-200/40 dark:ring-primary-900/30': isActive,
        'bg-gradient-to-r from-primary-100/80 to-primary-200/60 dark:from-primary-900/30 dark:to-primary-800/30': isActive && status === 'Available',
        'bg-gradient-to-r from-success-100/80 to-success-200/60 dark:from-success-900/30 dark:to-success-800/30': isActive && status === 'Running',
      }
    )}>
      <Icon className={clsx(
        config.iconColor,
        'transition-transform duration-200',
        {
          'w-3 h-3 mr-1': size === 'sm',
          'w-4 h-4 mr-1.5': size === 'md',
          'group-hover:scale-110 group-hover:rotate-6': isActive,
        }
      )} />
      {status}
    </span>
  );
}