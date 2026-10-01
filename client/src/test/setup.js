import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  cleanup();
  window.history.replaceState({}, '', '/');
  for (const cookie of document.cookie.split(';')) {
    document.cookie = `${cookie.split('=')[0].trim()}=; max-age=0; path=/`;
  }
});
