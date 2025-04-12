
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect to dashboard if logged in
        navigate('/');
      } else {
        // Redirect to auth if not logged in
        navigate('/auth');
      }
    }
  }, [navigate, user, loading]);

  return null;
};

export default Index;
