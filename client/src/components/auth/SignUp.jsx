import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const SignUp = () => {
  const { register, loading } = useAuth();

  return (
    <div className="auth-page">
      <AuthForm type="register" onSubmit={register} loading={loading} />
    </div>
  );
};

export default SignUp;
