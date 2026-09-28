import React from 'react';
import { CheckCircle2Icon, AlertTriangleIcon, InfoIcon } from 'lucide-react';

export const theme = {
  bgLight: '#F8E7C9',
  bgDark: '#064E3B',
  bgGradient: 'linear-gradient(135deg, #F8E7C9 0%, #EADDCD 100%)',
  cardBg: '#ffffff',
  textDark: '#064E3B',
  textLight: '#F8E7C9',
  buttonBg: '#064E3B',
  buttonHover: '#047857',
  border: '#EADDCD'
};

export const Alert = ({ children, variant = 'default' }) => {
  const isError = variant === 'destructive';
  const childArray = React.Children.toArray(children);
  return (
    <div style={{
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
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
        {childArray[0]}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {childArray.slice(1)}
      </div>
    </div>
  );
};

export const AlertTitle = ({ children }) => (
  <h5 style={{ margin: 0, fontSize: '16px', fontWeight: '900', letterSpacing: '0.5px' }}>
    {children}
  </h5>
);

export const AlertDescription = ({ children }) => (
  <p style={{ margin: 0, fontSize: '14px', opacity: 0.9, lineHeight: '1.5' }}>
    {children}
  </p>
);

export const Button = ({ children, onClick, disabled, variant = 'primary', style }) => {
  const isPrimary = variant === 'primary';
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      style={{ 
        background: disabled ? theme.border : (isPrimary ? theme.buttonBg : 'transparent'), 
        color: disabled ? '#888' : (isPrimary ? theme.textLight : theme.textDark), 
        border: isPrimary ? 'none' : `2px solid ${theme.buttonBg}`, 
        padding: '16px 24px', 
        borderRadius: '10px', 
        fontWeight: '900', 
        cursor: disabled ? 'not-allowed' : 'pointer', 
        fontSize: '16px', 
        boxShadow: disabled ? 'none' : (isPrimary ? '0 8px 15px rgba(6,78,59,0.2)' : 'none'), 
        transition: 'all 0.2s',
        ...style
      }}
    >
      {children}
    </button>
  );
};
