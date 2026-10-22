/**
 * Universal Easy HiCare Real-Time State Client
 * Manages atomic cross-port synchronization against `/api/state`.
 */

export const DEFAULT_API_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  (typeof window !== 'undefined' && window.location.port === '3000'
    ? ''
    : 'http://localhost:3000');

export async function fetchLiveState(baseUrl = DEFAULT_API_URL) {
  try {
    const res = await fetch(`${baseUrl}/api/state`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function pushLiveState(stateUpdate, baseUrl = DEFAULT_API_URL) {
  try {
    const res = await fetch(`${baseUrl}/api/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stateUpdate),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function resetLiveState(baseUrl = DEFAULT_API_URL) {
  try {
    const res = await fetch(`${baseUrl}/api/state/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}
