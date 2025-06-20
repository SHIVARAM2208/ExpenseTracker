import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const SignIn = () => {
  const { login, loading } = useAuth();

  return (
    <div className="auth-page">
      <AuthForm type="login" onSubmit={login} loading={loading} />
    </div>
  );
};

export default SignIn;
