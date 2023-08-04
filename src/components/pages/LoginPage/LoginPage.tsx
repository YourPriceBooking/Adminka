import type { FormEvent } from 'react';
import { useFromLocation } from 'common/hooks';
import { useAppDispatch } from 'App';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectIsLoggedIn } from 'features/common';
import { loginPageStyles } from './LoginPage.styled';

export const LoginPage = () => {
  const appDispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const from = useFromLocation();
  const nav = useNavigate();

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const password = formData.get('password')?.toString().trim();
    if (!password) return;

    appDispatch(login(password));
  };

  useEffect(() => {
    if (isLoggedIn && from) {
      nav(from);
    }
  }, [from, isLoggedIn, nav]);

  return (
    <div style={loginPageStyles.container}>
      <form style={loginPageStyles.form} onSubmit={onLogin}>
        <div style={loginPageStyles.isHidden}>
          <label style={loginPageStyles.label}>
            <span style={loginPageStyles.span}>Username</span>
            <input
              style={loginPageStyles.input}
              type="text"
              name="username"
              autoComplete="username"
            />
          </label>
        </div>

        <label style={loginPageStyles.label}>
          <span style={loginPageStyles.span}>Password</span>
          <input
            style={loginPageStyles.input}
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </label>

        <button style={loginPageStyles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
