import React from 'react';
import { Link } from 'react-router-dom';
import { getRouteMain } from '@/shared/const/router';
import { Header } from '@/widgets/header';

export const NotFoundPage: React.FC = () => (
  <div className="page page--gray page--not-found">
    <Header />
    <div className="page__main page__main--not-found">
      <h1>404 Not Found</h1>
      <p>Извините, страница, которую вы ищите, не существует.</p>
      <Link to={getRouteMain()}>Перейти на главную</Link>
    </div>
  </div>
);
