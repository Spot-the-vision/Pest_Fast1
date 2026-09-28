import React from 'react';

export declare const theme: {
  bgLight: string;
  bgDark: string;
  bgGradient: string;
  cardBg: string;
  textDark: string;
  textLight: string;
  buttonBg: string;
  buttonHover: string;
  border: string;
};

export declare const Alert: React.FC<{
  children?: React.ReactNode;
  variant?: 'default' | 'destructive';
}>;

export declare const AlertTitle: React.FC<{
  children?: React.ReactNode;
}>;

export declare const AlertDescription: React.FC<{
  children?: React.ReactNode;
}>;

export declare const Button: React.FC<{
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  disabled?: boolean;
  variant?: 'primary' | 'outline';
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}>;
