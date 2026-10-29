import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import PathwayObjectives from './components/pathway-components/PathwayObjectives';

describe('React compatibility', () => {
  it('offers the demo from the home page and has no sign-up', async () => {
    render(<App />);
    expect(screen.getByText(/Life’s most persistent/)).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'Dashboard' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'Sign Up' })).toBeNull();
    fireEvent.click(screen.getByRole('link', { name: 'Try the demo' }));
    expect(await screen.findByRole('heading', { name: 'Try the demo' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Explore as Mentee' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Explore as Mentor' })).toBeTruthy();
  });

  it('renders the demo picker when opened directly', () => {
    window.history.replaceState({}, '', '/login');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Try the demo' })).toBeTruthy();
  });

  it('sends a signed-out visitor from a signed-in page to the demo picker', () => {
    window.history.replaceState({}, '', '/userdash');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Try the demo' })).toBeTruthy();
    expect(window.location.pathname).toBe('/login');
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
