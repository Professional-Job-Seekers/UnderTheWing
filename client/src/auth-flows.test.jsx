import { afterEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import DemoRoleLogin from './components/DemoRoleLogin';
import auth from './services/auth';

const response = (ok, body = {}) => ({ ok, json: async () => body });
afterEach(() => { vi.unstubAllGlobals(); auth.isAuthenticated = false; });
function open() {
  render(<MemoryRouter initialEntries={['/login']}>
    <Route path="/login" component={DemoRoleLogin} />
    <Route path="/userdash" render={() => <p>dashboard</p>} />
  </MemoryRouter>);
}
it('signs in as the demo mentor, records the role and opens the dashboard', async () => {
  const fetchMock = vi.fn().mockResolvedValueOnce(response(true)).mockResolvedValueOnce(response(true, { is_mentor: true }));
  vi.stubGlobal('fetch', fetchMock);
  open();
  fireEvent.click(screen.getByRole('button', { name: 'Explore as Mentor' }));
  expect(await screen.findByText('dashboard')).toBeTruthy();
  expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ username: 'demo_mentor', password: 'demo1234' });
  expect(fetchMock.mock.calls[1][0]).toBe('/api/accounts/mentor/?username=demo_mentor');
  expect(document.cookie).toContain('user_type=mentor');
  expect(auth.hasSession()).toBe(true);
});
it('records the mentee role for the demo mentee', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(response(true)).mockResolvedValueOnce(response(true, { is_mentor: false })));
  open();
  fireEvent.click(screen.getByRole('button', { name: 'Explore as Mentee' }));
  await waitFor(() => expect(document.cookie).toContain('user_type=mentee'));
});
it('shows an error and no session when the demo account cannot sign in', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response(false)));
  open();
  fireEvent.click(screen.getByRole('button', { name: 'Explore as Mentee' }));
  expect((await screen.findByRole('alert')).textContent).toContain('Could not start the demo');
  expect(document.cookie).not.toContain('auth=true');
  expect(auth.hasSession()).toBe(false);
});
it('does not claim a session if the role lookup fails', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(response(true)).mockResolvedValueOnce(response(false)));
  open();
  fireEvent.click(screen.getByRole('button', { name: 'Explore as Mentor' }));
  expect(await screen.findByRole('alert')).toBeTruthy();
  expect(document.cookie).not.toContain('auth=true');
  expect(auth.hasSession()).toBe(false);
});
it('keeps a session across a refresh through the auth cookie', () => {
  document.cookie = 'auth=true; path=/';
  expect(auth.hasSession()).toBe(true);
});
