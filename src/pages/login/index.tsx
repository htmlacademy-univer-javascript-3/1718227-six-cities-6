import React, { useState, FormEvent, ChangeEvent, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Header } from '@/widgets/header';
import { useAppDispatch, useAppSelector } from '@/shared/lib/redux';
import { login, AuthorizationStatus } from '@/entities/user';
import { setCity } from '@/entities/offer';
import { getRouteMain } from '@/shared/const/router';
import { CITIES } from '@/shared/const/cities';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const randomCity = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * CITIES.length);
    return CITIES[randomIndex];
  }, []);

  const validatePassword = (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    return hasLetter && hasDigit;
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={getRouteMain()} replace />;
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validatePassword(formData.password)) {
      return;
    }

    dispatch(login(formData))
      .unwrap()
      .then(() => {
        navigate(getRouteMain());
      });
  };

  const handleRandomCityClick = () => {
    dispatch(setCity(randomCity));
    navigate(getRouteMain());
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={!validatePassword(formData.password)}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  handleRandomCityClick();
                }}
              >
                <span>{randomCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
