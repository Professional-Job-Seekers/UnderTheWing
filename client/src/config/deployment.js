export const isPages = () => import.meta.env.MODE === 'pages';
export const hasBackend = () => !isPages() || Boolean(import.meta.env.VITE_API_ORIGIN);

export function appHref(path) {
  const route = path.startsWith('/') ? path : `/${path}`;
  return isPages() ? `${import.meta.env.BASE_URL}#${route}` : route;
}
