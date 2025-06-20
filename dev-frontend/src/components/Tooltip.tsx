import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export function Tooltip({ content, children, placement = 'right', delay = 500 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const tooltipOffset = 8;
        
        let x = 0;
        let y = 0;
        
        switch (placement) {
          case 'right':
            x = rect.right + tooltipOffset;
            y = rect.top + rect.height / 2;
            break;
          case 'left':
            x = rect.left - tooltipOffset;
            y = rect.top + rect.height / 2;
            break;
          case 'top':
            x = rect.left + rect.width / 2;
            y = rect.top - tooltipOffset;
            break;
          case 'bottom':
            x = rect.left + rect.width / 2;
            y = rect.bottom + tooltipOffset;
            break;
        }
        
        setPosition({ x, y });
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const clonedChild = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
  });

  return (
    <>
      {clonedChild}
      {isVisible && createPortal(
        <div
          className={clsx(
            'fixed z-50 px-2 py-1 text-label-small font-medium',
            'bg-gcp-800 dark:bg-gcp-200 text-white dark:text-gcp-900',
            'rounded-md shadow-elevation-2 pointer-events-none',
            'transform transition-opacity duration-200',
            {
              '-translate-x-1/2': placement === 'top' || placement === 'bottom',
              '-translate-y-1/2': placement === 'left' || placement === 'right',
              '-translate-x-full': placement === 'left',
              '-translate-y-full': placement === 'top',
            }
          )}
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
}