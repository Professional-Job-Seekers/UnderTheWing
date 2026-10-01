import { expect, it } from 'vitest';
import { act } from 'react';
import { screen } from '@testing-library/react';

it('mounts the actual application entry point on React 19', async () => {
  document.body.innerHTML = '<div id="root"></div>';
  await act(async () => {
    await import('./index.jsx');
  });
  expect(screen.getByRole('link', { name: 'Under The Wing' })).toBeTruthy();
  expect(screen.getByText(/Life’s most persistent/)).toBeTruthy();
});
