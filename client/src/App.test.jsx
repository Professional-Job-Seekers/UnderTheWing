import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import PathwayObjectives from './components/pathway-components/PathwayObjectives';

describe('React compatibility', () => {
  it('navigates from the home page to login and registration', async () => {
    render(<App />);
    expect(screen.getByText(/Life’s most persistent/)).toBeTruthy();
    fireEvent.click(screen.getByRole('link', { name: 'Login' }));
    expect(await screen.findByRole('heading', { name: 'Login' })).toBeTruthy();
    expect(screen.getByPlaceholderText('Username or Email')).toBeTruthy();
    fireEvent.click(screen.getByRole('link', { name: 'Sign Up' }));
    expect(await screen.findByRole('heading', { name: 'Sign Up' })).toBeTruthy();
    expect(screen.getByPlaceholderText('First Name')).toBeTruthy();
  });

  it('renders the login page when opened directly', () => {
    window.history.replaceState({}, '', '/login');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeTruthy();
  });

  it('switches pathway tabs using the upgraded Bootstrap components', async () => {
    render(<PathwayObjectives activePathwayData={[
      { pathway: 'Engineering', tasks: [] },
      { pathway: 'Design', tasks: [] },
    ]} />);
    const engineering = await screen.findByRole('tab', { name: 'Engineering' });
    const design = screen.getByRole('tab', { name: 'Design' });
    fireEvent.click(engineering);
    await waitFor(() => expect(engineering.getAttribute('aria-selected')).toBe('true'));
    fireEvent.click(design);
    await waitFor(() => expect(design.getAttribute('aria-selected')).toBe('true'));
    expect(engineering.getAttribute('aria-selected')).toBe('false');
  });
});
