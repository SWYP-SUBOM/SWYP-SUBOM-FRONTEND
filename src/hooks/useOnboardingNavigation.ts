import { useNavigate, useLocation } from 'react-router-dom';
import { ONBOARDING_FLOW, ROUTES } from '../routes/routes';

export const useOnboardingNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNext = () => {
    const currentPath = location.pathname;
    const nextPath = ONBOARDING_FLOW[currentPath];

    if (nextPath) {
      navigate(nextPath);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const handleSkip = () => {
    navigate(ROUTES.HOME);
  };

  return { handleNext, handleSkip };
};
