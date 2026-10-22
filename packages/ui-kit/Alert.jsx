import React from 'react';
import { theme } from '@pest-free/shared-config';

export const Alert = ({ children, variant = 'default' }) => {
  const isError = variant === 'destructive';
  const childArray = React.Children.toArray(children);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        borderRadius: '8px',
        border: `1px solid ${isError ? '#fca5a5' : theme.buttonBg}`,
        background: isError ? '#fef2f2' : theme.bgLight,
        color: isError ? '#991b1b' : theme.textDark,
        marginBottom: '16px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
        {childArray[0]}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>{childArray.slice(1)}</div>
    </div>
  );
};

export const AlertTitle = ({ children }) => (
  <h5 style={{ margin: 0, fontSize: '16px', fontWeight: '900', letterSpacing: '0.5px' }}>
    {children}
  </h5>
);

export const AlertDescription = ({ children }) => (
  <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, lineHeight: '1.5' }}>{children}</p>
);
