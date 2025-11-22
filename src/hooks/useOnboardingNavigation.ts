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

  const handleSkip = () => {
    const currentPath = location.pathname;

    switch (currentPath) {
      case ROUTES.ONBOARDING_INTRO1:
      case ROUTES.ONBOARDING_INTRO2:
        navigate(ROUTES.ONBOARDING_LOGIN);
        break;

      case ROUTES.ONBOARDING_LOGIN:
        navigate(ROUTES.HOME);
        break;

      case ROUTES.ONBOARDING_GUIDE_SCREEN1:
      case ROUTES.ONBOARDING_GUIDE_SCREEN2:
      case ROUTES.ONBOARDING_GUIDE_SCREEN3:
        navigate(ROUTES.ONBOARDING_GUIDE_SCREEN4);
        break;

      default:
        navigate(ROUTES.HOME);
        break;
    }
  };

  return { handleNext, handleSkip };
};
