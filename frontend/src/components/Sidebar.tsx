import { 
  LayoutDashboard, 
  Server, 
  Container, 
  Database, 
  Archive,
  Settings,
  ChevronRight,
  Activity,
  Cloud,
  RefreshCw
} from 'lucide-react';
import { SidebarToggle } from './SidebarToggle';
import clsx from 'clsx';
import { Tooltip } from './Tooltip';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, count: 8 },
  { id: 'vm-instances', label: 'VM Instances', icon: Server, count: 3 },
  { id: 'gke-clusters', label: 'GKE Clusters', icon: Container, count: 2 },
  { id: 'cloud-sql', label: 'Cloud SQL', icon: Database, count: 1 },
  { id: 'storage', label: 'Storage', icon: Archive, count: 1 },
  { id: 'other', label: 'Other Resources', icon: Archive, count: 1 },
];

const navigationGroups = [
  {
    header: 'Compute',
    items: [
      { id: 'vm-instances', label: 'VM Instances', icon: Server, count: 3 },
      { id: 'gke-clusters', label: 'GKE Clusters', icon: Container, count: 2 },
    ],
  },
  {
    header: 'Database',
    items: [
      { id: 'cloud-sql', label: 'Cloud SQL', icon: Database, count: 1 },
    ],
  },
  {
    header: 'Storage',
    items: [
      { id: 'storage', label: 'Storage', icon: Archive, count: 1 },
    ],
  },
  {
    header: 'Other',
    items: [
      { id: 'other', label: 'Other Resources', icon: Archive, count: 1 },
    ],
  },
];

export function Sidebar({ activeSection, onSectionChange, isCollapsed, onToggleSidebar }: SidebarProps) {
  const renderNavigationItem = (item: typeof navigationItems[0]) => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;
    // Add gradient border for active
    const activeBorder = isActive ? 'border-2 border-transparent bg-clip-padding bg-gradient-to-r from-primary-200/60 to-primary-400/40 dark:from-primary-900/40 dark:to-primary-800/40 shadow-elevation-2' : '';
    const buttonContent = (
      <button
        onClick={() => onSectionChange(item.id)}
        className={clsx(
          'w-full flex items-center justify-between rounded-xl transition-all duration-200 group',
          'text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'dark:focus:ring-offset-gcp-900',
          activeBorder,
          {
            'bg-primary-50/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300': isActive,
            'text-gcp-700 dark:text-gcp-300 hover:bg-gcp-50/80 dark:hover:bg-gcp-800/80': !isActive,
            'px-4 py-3': !isCollapsed,
            'px-2 py-2.5 justify-center': isCollapsed,
            'shadow-elevation-1': !isActive,
            'shadow-elevation-2': isActive,
            'backdrop-blur-xl': true,
            'border border-white/20 dark:border-gcp-700/40': true,
          }
        )}
        style={{ boxShadow: isActive ? '0 4px 16px 0 rgba(66,165,245,0.10)' : undefined }}
      >
        <div className={clsx(
          'flex items-center',
          {
            'space-x-3': !isCollapsed,
            'justify-center': isCollapsed,
          }
        )}>
          <Icon className={clsx(
            'w-5 h-5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0',
            {
              'text-primary-600 dark:text-primary-400 drop-shadow-[0_1px_4px_rgba(66,165,245,0.15)]': isActive,
              'text-gcp-500 dark:text-gcp-400 group-hover:text-gcp-700 dark:group-hover:text-gcp-300': !isActive,
            }
          )} />
          {!isCollapsed && (
            <span className="text-body-medium font-medium truncate animate-fade-in">
              {item.label}
            </span>
          )}
        </div>
        {!isCollapsed && (
          <div className="flex items-center space-x-2 flex-shrink-0">
            {item.count !== undefined && (
              <span className={clsx(
                'inline-flex items-center justify-center px-2 py-0.5 rounded-full text-label-small shadow-sm animate-fade-in',
                {
                  'bg-gradient-to-r from-primary-100/90 to-primary-200/80 dark:from-primary-900/40 dark:to-primary-800/40 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800': isActive,
                  'bg-gcp-100 dark:bg-gcp-700 text-gcp-600 dark:text-gcp-400': !isActive,
                }
              )}>
                {item.count}
              </span>
            )}
            {isActive && (
              <ChevronRight className="w-4 h-4 text-primary-600 dark:text-primary-400 animate-fade-in" />
            )}
          </div>
        )}
      </button>
    );

    if (isCollapsed) {
      return (
        <Tooltip key={item.id} content={`${item.label} (${item.count})`} placement="right">
          {buttonContent}
        </Tooltip>
      );
    }

    return <div key={item.id}>{buttonContent}</div>;
  };

  const renderSettingsItem = () => {
    const isActive = activeSection === 'settings';
    const activeBorder = isActive ? 'border-2 border-transparent bg-clip-padding bg-gradient-to-r from-primary-200/60 to-primary-400/40 dark:from-primary-900/40 dark:to-primary-800/40 shadow-elevation-2' : '';
    const buttonContent = (
      <button
        onClick={() => onSectionChange('settings')}
        className={clsx(
          'w-full flex items-center rounded-xl transition-all duration-200',
          'text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          'dark:focus:ring-offset-gcp-900',
          activeBorder,
          {
            'bg-primary-50/80 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300': isActive,
            'text-gcp-700 dark:text-gcp-300 hover:bg-gcp-50/80 dark:hover:bg-gcp-800/80': !isActive,
            'space-x-3 px-4 py-3': !isCollapsed,
            'justify-center px-2 py-2.5': isCollapsed,
            'shadow-elevation-1': !isActive,
            'shadow-elevation-2': isActive,
          }
        )}
        style={{ boxShadow: isActive ? '0 4px 16px 0 rgba(66,165,245,0.10)' : undefined }}
      >
        <Settings className={clsx(
          'w-5 h-5 transition-colors flex-shrink-0',
          {
            'text-primary-600 dark:text-primary-400 drop-shadow-[0_1px_4px_rgba(66,165,245,0.15)]': isActive,
            'text-gcp-500 dark:text-gcp-400': !isActive,
          }
        )} />
        {!isCollapsed && (
          <span className="text-body-medium font-medium animate-fade-in">Settings</span>
        )}
      </button>
    );

    if (isCollapsed) {
      return (
        <Tooltip content="Settings" placement="right">
          {buttonContent}
        </Tooltip>
      );
    }

    return buttonContent;
  };

  return (
    <aside className={clsx(
      'fixed top-0 left-0 z-30',
      'bg-white/90 dark:bg-[#181A20]/90',
      'border-r border-gcp-200 dark:border-gcp-800',
      'h-screen',
      'flex-shrink-0 shadow-elevation-2',
      'pt-2',
      'transition-all duration-300 ease-in-out',
      {
        'w-64': !isCollapsed,
        'w-16': isCollapsed,
      }
    )}>
      {/* Sticky header: toggle + logo */}
      <div
        className={clsx(
          'sticky top-0 z-10 flex items-center transition-all duration-300 ease-in-out',
          'shadow-elevation-1 backdrop-blur-xl rounded-b-2xl',
          {
            'p-2': isCollapsed,
            'p-5 pb-4': !isCollapsed,
            'bg-gradient-to-b from-white/95 via-white/90 to-white/95': !isCollapsed,
            'dark:bg-gradient-to-b dark:from-[#23242a] dark:to-[#181A20]': !isCollapsed,
            'bg-white dark:bg-[#181A20]': isCollapsed,
            'border-b border-gcp-200 dark:border-gcp-800': true,
          }
        )}
        style={{ marginTop: 0, paddingTop: 0 }}
      >
        {/* Sidebar Toggle Button */}
        <div className="mr-2 ml-0">
          <SidebarToggle isCollapsed={isCollapsed} onToggle={onToggleSidebar} />
        </div>
        <div
          className={clsx(
            'flex items-center space-x-3 transition-opacity duration-300',
            {
              'opacity-100': !isCollapsed,
              'opacity-0 pointer-events-none': isCollapsed,
            }
          )}
          style={{
            marginLeft: '1.25rem',
            marginTop: '2px',
            minWidth: 0,
          }}
        >
          <span className="flex items-center">
            <Cloud className="w-7 h-7 text-primary-400 dark:text-primary-400 flex-shrink-0 drop-shadow-[0_2px_8px_rgba(66,165,245,0.22)]" />
            <span className="ml-2 text-title-large font-semibold tracking-tight text-gcp-900 dark:text-white drop-shadow-[0_1px_4px_rgba(66,165,245,0.18)] select-none">
              FinCortex
            </span>
          </span>
        </div>
      </div>
      {/* Sidebar scrollable content */}
      <div className={clsx(
        'flex flex-col h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar',
        'transition-opacity duration-300',
        {
          'opacity-100': !isCollapsed,
          'opacity-80': isCollapsed,
        }
      )}>
        {/* Agent Status */}
        {!isCollapsed && (
          <div className="mb-3 p-3 bg-white/70 dark:bg-dark-card/80 rounded-xl border border-gcp-200 dark:border-dark-border shadow-elevation-1 backdrop-blur-xl transition-all duration-300 animate-fade-in">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-success-500 flex-shrink-0 animate-fade-in" />
              <span className="text-label-medium font-medium text-gcp-900 dark:text-dark-text truncate">Agent Status</span>
            </div>
            <div className="text-body-small text-gcp-600 dark:text-dark-muted truncate">ZombieDetectorAgent: Active</div>
            <div className="text-body-small text-gcp-500 dark:text-dark-muted truncate">Last scan: 2 hours ago</div>
            {/* Scan Button */}
            <button
              className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-600 hover:to-primary-500 text-white text-sm font-medium transition-transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg shadow-elevation-2 animate-fade-in active:scale-95"
              onClick={() => {/* trigger scan logic here */}}
              type="button"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              Scan
            </button>
          </div>
        )}
        {isCollapsed && (
          <div className="mb-3 flex flex-col items-center animate-fade-in">
            <Tooltip content="ZombieDetectorAgent: Active (Last scan: 2 hours ago)" placement="right">
              <div className="p-2 bg-white/70 dark:bg-dark-card/80 rounded-xl border border-gcp-200 dark:border-dark-border mb-2 shadow-elevation-1 backdrop-blur-xl">
                <Activity className="w-4 h-4 text-success-500 animate-fade-in" />
              </div>
            </Tooltip>
            {/* Scan Button (icon only) */}
            <Tooltip content="Scan" placement="right">
              <button
                className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-600 hover:to-primary-500 text-white transition-transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-bg shadow-elevation-2 animate-fade-in active:scale-95"
                onClick={() => {/* trigger scan logic here */}}
                type="button"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
              </button>
            </Tooltip>
          </div>
        )}
        {/* Navigation */}
        <nav className="mb-8 flex-1">
          {!isCollapsed && (
            <div className="mb-2 animate-fade-in">
              <span className="text-label-small text-gcp-500 dark:text-white font-semibold uppercase tracking-wide pl-2">Overview</span>
            </div>
          )}
          {renderNavigationItem({ id: 'overview', label: 'Overview', icon: LayoutDashboard, count: 8 })}
          {navigationGroups.map((group) => (
            <div key={group.header} className="mt-4 animate-fade-in">
              {!isCollapsed && (
                <div className="mb-1 pl-2">
                  <span className="text-label-small text-gcp-500 dark:text-white font-semibold uppercase tracking-wide">{group.header}</span>
                </div>
              )}
              <div className="space-y-1">
                {group.items.map(renderNavigationItem)}
              </div>
            </div>
          ))}
        </nav>
        {/* Settings button always at the bottom */}
        <div className="mt-auto flex flex-col gap-2 items-center pb-4">
          <div className={clsx(
            'w-full',
            {
              'border-t border-gcp-200 dark:border-gcp-700 pt-4': !isCollapsed,
              'border-t border-gcp-200 dark:border-gcp-700 pt-2': isCollapsed,
            }
          )}>
            {renderSettingsItem()}
          </div>
        </div>
      </div>
    </aside>
  );
}