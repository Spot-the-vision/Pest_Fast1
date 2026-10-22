import React from 'react';

/**
 * Universal Card Container
 */
export function Card({ children, className = '', hover = false, onClick, style, ...rest }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`bg-white border border-[#ebe8e3] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs transition-all duration-200 ${
        hover ? 'hover:shadow-md hover:border-[#003527]/20 cursor-pointer' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
