import { hasBackend } from '../config/deployment';

export function apiFetch(path, options = {}) {
  if (!hasBackend()) {
    return Promise.reject(new Error('This frontend preview is not connected to a backend.'));
  }
  const origin = (import.meta.env.VITE_API_ORIGIN || '').replace(/\/+$/, '');
  const route = `/${path.replace(/^\/+/, '')}`;
  return fetch(`${origin}${route}`, {
    ...options,
    credentials: origin ? 'include' : 'same-origin',
  });
}
