import { afterEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { appHref } from './config/deployment';
import { apiFetch } from './services/api';
import App from './App';

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
function pages() {
  vi.stubEnv('MODE', 'pages');
  vi.stubEnv('BASE_URL', '/UnderTheWing/');
  vi.stubEnv('VITE_API_ORIGIN', '');
}
it('keeps local navigation paths unchanged', () => {
  expect(appHref('/pathway')).toBe('/pathway');
});
it('keeps Pages links and redirects within the repository hash route', () => {
  pages();
  expect(appHref('/pathway')).toBe('/UnderTheWing/#/pathway');
  expect(appHref('/')).toBe('/UnderTheWing/#/');
});
it('sends remote API requests with session credentials, outside the Pages base path', async () => {
  pages();
  vi.stubEnv('VITE_API_ORIGIN', 'https://api.example.com/');
  const request = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', request);
  await apiFetch('api/auth/login', { method: 'POST', body: '{}' });
  expect(request).toHaveBeenCalledWith('https://api.example.com/api/auth/login', {
    method: 'POST', body: '{}', credentials: 'include',
  });
});
it('does not send preview requests to the GitHub Pages host', async () => {
  pages();
  const request = vi.fn();
  vi.stubGlobal('fetch', request);
  await expect(apiFetch('/api/pathways')).rejects.toThrow('not connected');
  expect(request).not.toHaveBeenCalled();
});
it('opens a hash deep link and explains backend-only features in preview mode', async () => {
  pages();
  window.history.replaceState({}, '', '/UnderTheWing/#/login');
  render(<App />);
  expect(screen.getByRole('status').textContent).toContain('not connected');
  fireEvent.click(screen.getByRole('link', { name: 'About Us' }));
  expect(await screen.findByRole('heading', { name: /about/i })).toBeTruthy();
  expect(window.location.hash).toBe('#/about-us');
});
