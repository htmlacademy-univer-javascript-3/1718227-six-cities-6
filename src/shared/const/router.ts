export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',
  FAVORITES = 'favorites',
  OFFER = 'offer',
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteFavorites = () => '/favorites';
export const getRouteOffer = (id: string) => `/offer/${id}`;
export const getRouteNotFound = () => '*';
