import type { OnboardingLayoutType } from '../../pages/Onboarding/Onboarding.type';

export const OnboardingLayout = ({ title, subtitle, image }: OnboardingLayoutType) => {
  return (
    <>
      <div
        className={
          'flex flex-col  mt-[100px] sm:mt-[154px] justify-center items-center text-center T02_B text-gray-900'
        }
      >
        {title}
        <div className="mt-[12px] B03_1_M text-gray-800">{subtitle}</div>
      </div>

      <div className="flex justify-center items-center mt-4 sm:mt-[74px]">
        <img
          src={image.src}
          alt={image.alt}
          className={`object-contain ${image.className || ''}`}
        />
      </div>
    </>
  );
};
