import React from 'react';

/**
 * Universal Responsive Button Component
 * Supports primary, secondary, accent, outline, danger, ghost variants.
 */
export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon,
  type = 'button',
  onClick,
  ...rest
}, ref) => {
  const baseClasses =
    'inline-flex items-center justify-center font-bold tracking-tight rounded-xl transition-all duration-150 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-xs sm:text-sm gap-2',
    lg: 'px-5 py-3 text-sm sm:text-base gap-2.5',
  }[size] || 'px-4 py-2.5 text-xs sm:text-sm gap-2';

  const variantClasses = {
    primary: 'bg-[#003527] text-white hover:bg-[#064e3b] shadow-xs border border-transparent',
    secondary: 'bg-[#f0ede9] text-[#1c1c19] hover:bg-[#e5e2dd] border border-transparent',
    accent: 'bg-[#fea619] text-[#1c1c19] hover:bg-[#e59516] shadow-xs border border-transparent',
    outline: 'border border-[#ebe8e3] bg-white text-[#1c1c19] hover:bg-[#f6f3ee] shadow-2xs',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-xs border border-transparent',
    ghost: 'bg-transparent text-[#707974] hover:text-[#1c1c19] hover:bg-[#f0ede9] border border-transparent',
  }[variant] || 'bg-[#003527] text-white hover:bg-[#064e3b]';

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...rest}
    >
      {Icon && (
        <span className="shrink-0 flex items-center">
          {typeof Icon === 'string' ? (
            <span className="material-symbols-outlined text-[18px]">{Icon}</span>
          ) : (
            <Icon className="w-4 h-4" />
          )}
        </span>
      )}
      {children}
    </button>
  );
});
Button.displayName = 'Button';
