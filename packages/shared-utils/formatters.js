/**
 * Shared Formatting Utilities
 * Pure JavaScript module.
 */

export function formatCurrency(amount) {
  if (typeof amount !== 'number') return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatDistance(km) {
  if (typeof km !== 'number') return '0 km';
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function formatTimeSeconds(seconds) {
  if (!seconds || seconds <= 0) return '0 mins';
  const mins = Math.ceil(seconds / 60);
  return `${mins} min${mins > 1 ? 's' : ''}`;
}

export function extractAreaFromAddress(address) {
  if (!address || typeof address !== 'string') return 'Jayanagar, Bangalore';
  const parts = address
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return parts.slice(-2).join(', ');
  }
  return parts[0] || 'Jayanagar, Bangalore';
}
