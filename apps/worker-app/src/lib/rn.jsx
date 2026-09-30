import React from 'react';

/**
 * Adaptive React Native Primitives Bridge
 * Provides 1:1 React Native primitive components (View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, Platform)
 * for seamless web rendering with full desktop styling, responsive CSS class preservation,
 * and zero text-node crashes.
 */

export const View = React.forwardRef(({
  children,
  style,
  className = '',
  accessibilityRole,
  accessibilityLabel,
  testID,
  onClick,
  onPress,
  ...rest
}, ref) => {
  const flattenedStyle = Array.isArray(style)
    ? Object.assign({}, ...style.filter(Boolean))
    : style;

  return (
    <div
      ref={ref}
      className={className}
      style={flattenedStyle}
      role={accessibilityRole}
      aria-label={accessibilityLabel}
      data-testid={testID}
      onClick={onPress || onClick}
      {...rest}
    >
      {children}
    </div>
  );
});
View.displayName = 'View';

export const Text = React.forwardRef(({
  children,
  style,
  className = '',
  numberOfLines,
  onPress,
  onClick,
  accessibilityRole,
  accessibilityLabel,
  ...rest
}, ref) => {
  const flattenedStyle = Array.isArray(style)
    ? Object.assign({}, ...style.filter(Boolean))
    : (style || {});
  const lineClampStyle = numberOfLines ? {
    display: '-webkit-box',
    WebkitLineClamp: numberOfLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } : {};

  return (
    <span
      ref={ref}
      className={className}
      style={{ ...flattenedStyle, ...lineClampStyle }}
      role={accessibilityRole}
      aria-label={accessibilityLabel}
      onClick={onPress || onClick}
      {...rest}
    >
      {children}
    </span>
  );
});
Text.displayName = 'Text';

export const TouchableOpacity = React.forwardRef(({
  children,
  style,
  className = '',
  onPress,
  onClick,
  disabled,
  activeOpacity = 0.7,
  accessibilityRole = 'button',
  accessibilityLabel,
  testID,
  type = 'button',
  ...rest
}, ref) => {
  const flattenedStyle = Array.isArray(style)
    ? Object.assign({}, ...style.filter(Boolean))
    : (style || {});

  return (
    <button
      ref={ref}
      type={type}
      className={className}
      disabled={disabled}
      role={accessibilityRole}
      aria-label={accessibilityLabel}
      data-testid={testID}
      onClick={(e) => {
        if (disabled) return;
        if (onPress) onPress(e);
        else if (onClick) onClick(e);
      }}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'inherit',
        font: 'inherit',
        ...flattenedStyle
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
TouchableOpacity.displayName = 'TouchableOpacity';

export const Pressable = React.forwardRef(({
  children,
  style,
  className = '',
  onPress,
  onClick,
  disabled,
  accessibilityRole = 'button',
  ...rest
}, ref) => {
  const resolvedStyle = typeof style === 'function' ? style({ pressed: false }) : style;
  const flattenedStyle = Array.isArray(resolvedStyle)
    ? Object.assign({}, ...resolvedStyle.filter(Boolean))
    : (resolvedStyle || {});

  return (
    <div
      ref={ref}
      role={accessibilityRole}
      className={className}
      onClick={(e) => {
        if (disabled) return;
        if (onPress) onPress(e);
        else if (onClick) onClick(e);
      }}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...flattenedStyle
      }}
      {...rest}
    >
      {typeof children === 'function' ? children({ pressed: false }) : children}
    </div>
  );
});
Pressable.displayName = 'Pressable';

export const TextInput = React.forwardRef(({
  value,
  defaultValue,
  onChangeText,
  onChange,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  multiline,
  rows,
  numberOfLines = 4,
  keyboardType,
  type,
  maxLength,
  style,
  className = '',
  disabled,
  editable = true,
  ...rest
}, ref) => {
  const flattenedStyle = Array.isArray(style)
    ? Object.assign({}, ...style.filter(Boolean))
    : (style || {});

  const handleChange = (e) => {
    if (onChangeText) onChangeText(e.target.value);
    if (onChange) onChange(e);
  };

  const inputType = type || (secureTextEntry
    ? 'password'
    : keyboardType === 'numeric' || keyboardType === 'number-pad'
    ? 'number'
    : keyboardType === 'email-address'
    ? 'email'
    : keyboardType === 'phone-pad'
    ? 'tel'
    : 'text');

  if (multiline || rows) {
    return (
      <textarea
        ref={ref}
        rows={rows || numberOfLines}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={handleChange}
        maxLength={maxLength}
        disabled={disabled || !editable}
        className={className}
        style={flattenedStyle}
        {...rest}
      />
    );
  }

  return (
    <input
      ref={ref}
      type={inputType}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={handleChange}
      maxLength={maxLength}
      disabled={disabled || !editable}
      className={className}
      style={flattenedStyle}
      {...rest}
    />
  );
});
TextInput.displayName = 'TextInput';

export const ScrollView = React.forwardRef(({
  children,
  horizontal,
  contentContainerStyle,
  style,
  className = '',
  ...rest
}, ref) => {
  const flattenedStyle = Array.isArray(style)
    ? Object.assign({}, ...style.filter(Boolean))
    : (style || {});
  const flattenedContainerStyle = Array.isArray(contentContainerStyle)
    ? Object.assign({}, ...contentContainerStyle.filter(Boolean))
    : (contentContainerStyle || {});

  return (
    <div
      ref={ref}
      className={className}
      style={{
        overflowX: horizontal ? 'auto' : 'hidden',
        overflowY: horizontal ? 'hidden' : 'auto',
        ...flattenedStyle
      }}
      {...rest}
    >
      <div style={flattenedContainerStyle}>
        {children}
      </div>
    </div>
  );
});
ScrollView.displayName = 'ScrollView';

export const Image = React.forwardRef(({
  source,
  src,
  alt = '',
  resizeMode,
  style,
  className = '',
  ...rest
}, ref) => {
  const flattenedStyle = Array.isArray(style)
    ? Object.assign({}, ...style.filter(Boolean))
    : (style || {});
  const imgSrc = (source && (typeof source === 'string' ? source : source.uri)) || src;
  const objectFitStyle = resizeMode ? {
    objectFit: resizeMode === 'contain' ? 'contain' : resizeMode === 'cover' ? 'cover' : 'fill'
  } : {};

  return (
    <img
      ref={ref}
      src={imgSrc}
      alt={alt}
      className={className}
      style={{ ...flattenedStyle, ...objectFitStyle }}
      {...rest}
    />
  );
});
Image.displayName = 'Image';

export const SafeAreaView = View;

export const ActivityIndicator = ({ size = 'small', color = '#064E3B', style, className = '' }) => {
  const dim = size === 'large' ? 36 : 20;
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: '50%',
        border: '2px solid rgba(0,0,0,0.1)',
        borderTopColor: color,
        animation: 'spin 0.8s linear infinite',
        ...style
      }}
    />
  );
};

export const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => (Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : (style || {}))
};

export const Platform = {
  OS: 'web',
  select: (obj) => (obj.web !== undefined ? obj.web : (obj.default !== undefined ? obj.default : obj))
};

export default {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Platform
};
