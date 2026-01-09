import scrollup from '../../assets/Feed/scrollup.svg';
import { useScrollTop } from '../../hooks/useScrollTop';

export const ScrollToTopButton = () => {
  const { showButton, scrollToTop } = useScrollTop();

  return (
    <button
      onClick={scrollToTop}
      className={`
      absolute  bottom-28 right-6 z-0  
      p-[8px] rounded-full bg-white shadow-xl border-gray-300
      transition-all duration-500 ease-in-out cursor-pointer
      ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
    `}
      aria-label="Scroll to top"
    >
      <img src={scrollup} className="w-7 h-7" />
    </button>
  );
};
