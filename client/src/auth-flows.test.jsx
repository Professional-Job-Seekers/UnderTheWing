import { afterEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './components/forms/LoginForm';
import RegistrationForm from './components/forms/RegistrationForm';
import auth from './services/auth';

const response = (ok, body = {}) => ({ ok, json: async () => body });
afterEach(() => { vi.unstubAllGlobals(); auth.isAuthenticated = false; });
function login() {
  render(<MemoryRouter><LoginForm /></MemoryRouter>);
  fireEvent.change(screen.getByPlaceholderText('Username or Email'), { target: { value: 'mentor@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
  fireEvent.submit(screen.getByRole('button', { name: 'Login' }).closest('form'));
}
function register(confirmation = 'password') {
  render(<MemoryRouter><RegistrationForm /></MemoryRouter>);
  for (const [placeholder, value] of [
    ['First Name', 'Test'], ['Last Name', 'User'], ['Username', 'test-user'],
    ['Email', 'test@example.com'], ['Password', 'password'], ['Retype Password', confirmation],
  ]) fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value } });
  fireEvent.submit(screen.getByRole('button', { name: 'Register' }).closest('form'));
}
it('shows an error for a rejected login', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response(false)));
  login();
  expect((await screen.findByRole('alert')).textContent).toContain('Login Failed');
  expect(document.cookie).not.toContain('auth=true');
});
it('reads the mentor response before setting role and redirecting', async () => {
  const fetchMock = vi.fn().mockResolvedValueOnce(response(true)).mockResolvedValueOnce(response(true, { is_mentor: true }));
  vi.stubGlobal('fetch', fetchMock);
  login();
  await waitFor(() => expect(document.cookie).toContain('user_type=mentor'));
  expect(fetchMock.mock.calls[1][0]).toBe('/api/accounts/mentor/?username=mentor%40example.com');
});
it('does not claim a completed login if the role lookup fails', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(response(true)).mockResolvedValueOnce(response(false)));
  login();
  expect(await screen.findByRole('alert')).toBeTruthy();
  expect(document.cookie).not.toContain('auth=true');
});
it('rejects mismatched passwords before making a request', async () => {
  const fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
  register('different');
  expect((await screen.findByRole('alert')).textContent).toContain('Passwords do not match');
  expect(fetchMock).not.toHaveBeenCalled();
});
it.each([
  ['signup', [response(false)]],
  ['profile', [response(true), response(false)]],
  ['login', [response(true), response(true), response(false)]],
])('stops registration when %s fails', async (_, responses) => {
  const fetchMock = vi.fn();
  for (const item of responses) fetchMock.mockResolvedValueOnce(item);
  vi.stubGlobal('fetch', fetchMock);
  register();
  expect(await screen.findByRole('alert')).toBeTruthy();
  expect(document.cookie).not.toContain('auth=true');
  expect(fetchMock).toHaveBeenCalledTimes(responses.length);
});
