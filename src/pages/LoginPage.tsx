import { useFromLocation } from 'common/hooks';
import { useAppDispatch } from 'App';
import { FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectIsLoggedIn } from 'features/slices';

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

    appDispatch(login());
  };

  useEffect(() => {
    if (isLoggedIn && from) {
      nav(from);
    }
  }, [from, isLoggedIn, nav]);

  return (
    <div style={style.container}>
      <form onSubmit={onLogin}>
        <button style={style.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
