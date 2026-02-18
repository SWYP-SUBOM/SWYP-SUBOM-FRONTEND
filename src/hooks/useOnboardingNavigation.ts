import { useNavigate, useLocation } from 'react-router-dom';
import { ONBOARDING_FLOW, ROUTES } from '../routes/routes';

export const useOnboardingNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNext = () => {
    const currentPath = location.pathname;

    let nextPath = ONBOARDING_FLOW[currentPath];

    if (!nextPath) {
      const normalizedPath = Object.keys(ONBOARDING_FLOW).find(
        (key) => key.toLowerCase() === currentPath.toLowerCase(),
      );
      if (normalizedPath) {
        nextPath = ONBOARDING_FLOW[normalizedPath];
      }
    }

    if (nextPath) {
      navigate(nextPath);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  

  return { handleNext };
};
