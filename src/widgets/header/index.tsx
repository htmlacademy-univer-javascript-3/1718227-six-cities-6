import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  getRouteMain,
  getRouteLogin,
  getRouteFavorites,
} from '@/shared/const/router';
import { useAppSelector, useAppDispatch } from '@/shared/lib/redux';
import { AuthorizationStatus, logout } from '@/entities/user';
import { selectFavoritesCount } from '@/entities/favorites';

function HeaderComponent() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.user.authorizationStatus
  );
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleLogout = useCallback((evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
  }, [dispatch]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={getRouteMain()}
              className="header__logo-link header__logo-link--active"
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth ? (
                <>
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={getRouteFavorites()}
                    >
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={{
                          backgroundImage: `url(${userInfo?.avatarUrl})`,
                        }}
                      />
                      <span className="header__user-name user__name">
                        {userInfo?.email}
                      </span>
                      <span className="header__favorite-count">{favoritesCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={handleLogout}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={getRouteLogin()}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
