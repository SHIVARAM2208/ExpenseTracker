import { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthForm = ({ type, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (type === 'register' && !formData.name) {
      setError('Name is required');
      return;
    }
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    const result = await onSubmit(
      formData.name,
      formData.email,
      formData.password
    );

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{type === 'login' ? 'Sign In' : 'Sign Up'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <div className="auth-footer">
        {type === 'login' ? (
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        ) : (
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
