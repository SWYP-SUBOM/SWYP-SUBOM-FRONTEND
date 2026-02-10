import guideright from '../../../assets/Home/guideright.svg';
import pwa from '../../../assets/HomeBanner/pwa.png';

export const PwaBanner = () => {
  const handlePwaBannerClick = () => {
    window.open(
      'https://real-lemongrass-cb4.notion.site/2ff3f99db11380dfaca0c9b35f53c111?source=copy_link',
      '_blank',
    );
  };

  return (
    <div
      className="cursor-pointer relative mt-4 flex h-[96px] px-6 justify-between items-center rounded-xl bg-[#DAE7FF]"
      onClick={handlePwaBannerClick}
    >
      <div className="flex flex-col justify-center">
        <span className="B02_B text-gray-900 mb-1">앱처럼 이용하고 싶다면?</span>
        <div className="flex items-center">
          <h3 className="C01_SB text-gray-750">홈 화면에 '바로가기'추가하기</h3>
          <img src={guideright} className="w-5 h-5 object-contain" alt="arrow" />
        </div>
      </div>

      <div className="relative">
        <img
          src={pwa}
          className="w-[72px] h-auto object-contain transform hover:scale-105 transition-transform duration-300"
          alt="pwa"
        />
      </div>
    </div>
  );
};
