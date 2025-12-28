import { FavoritesPage } from '@/pages/favorites';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { OfferPage } from '@/pages/offer';
import { NotFoundPage } from '@/pages/not-found';
import {
  AppRoutes,
  getRouteMain,
  getRouteOffer,
  getRouteLogin,
  getRouteFavorites,
  getRouteNotFound,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
  },
  [AppRoutes.FAVORITES]: {
    path: getRouteFavorites(),
    element: <FavoritesPage />,
    authOnly: true,
  },
  [AppRoutes.OFFER]: {
    path: getRouteOffer(':id'),
    element: <OfferPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
};
