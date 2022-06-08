// import Home from 'components/pages/Home';

import { useAppDispatch } from 'hooks/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { login } from 'redux/slices';

const style = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' },
  button: { padding: '12px 16px', fontSize: '2rem' },
};

export default function LoginPage() {
  const appDispatch = useAppDispatch();
  const nav = useNavigate();

  const onLogin = () => {
    appDispatch(login());
    nav('/menu', { replace: true });
  };

  return (
    <div style={style.container}>
      <button style={style.button} onClick={onLogin}>
        Login
      </button>
    </div>
  );
}
