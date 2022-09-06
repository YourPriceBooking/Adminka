import { useFromLocation } from 'common/hooks';
import { useAppDispatch } from 'App';
import type { FormEvent } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectIsLoggedIn } from 'features/common';

const style = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' },
  button: { padding: '12px 16px', fontSize: '2rem' },
};

const LoginPage = () => {
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
    <div style={style.container}>
      <form onSubmit={onLogin}>
        <input type="password" name="password" />

        <button style={style.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
