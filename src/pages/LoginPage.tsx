import { useFromLocation } from 'hooks/navigation';
import { useAppDispatch } from 'hooks/redux/hooks';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { login } from 'redux/slices';

const style = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' },
  button: { padding: '12px 16px', fontSize: '2rem' },
};

const LoginPage = () => {
  const appDispatch = useAppDispatch();
  const nav = useNavigate();
  const from = useFromLocation();

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    appDispatch(login());
    nav(from || '/menu');
  };

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
