import guideright from '../../../assets/Home/guideright.svg';
import book from '../../../assets/HomeBanner/book.png';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
const ONBOARDING_GUIDE_SCREEN1 = ROUTES.ONBOARDING_GUIDE_SCREEN1;
 
export const GuideBanner = () => {
  const navigate = useNavigate();
  const handleGuideBannerClick = () => {
    
    navigate(ONBOARDING_GUIDE_SCREEN1);
  };

  return (
    <div
      className="cursor-pointer relative mt-4 flex h-[96px] px-6 justify-between items-center rounded-xl bg-b2"
      onClick={handleGuideBannerClick}
    >
      <div className="flex flex-col justify-center">
        <span className="B02_B text-gray-900 mb-1">써봄이 처음이라면?</span>
        <div className="flex items-center">
          <h3 className="C01_SB text-gray-750">간편하고 빠르게 써봄을 이용해보세요</h3>
          <img src={guideright} className="w-5 h-5 object-contain" alt="arrow" />
        </div>
      </div>

      <div className="relative">
        <img
          src={book}
          className="w-[72px] h-auto object-contain transform hover:scale-105 transition-transform duration-300"
          alt="book"
        />
      </div>
    </div>
  );
};
