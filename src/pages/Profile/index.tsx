import { TitleHeader } from '../../components/common/TitleHeader';
import { ProfileContents } from './_components/Profilecontents';
import profile from '../../assets/Profile/profile.png';

const Profile = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-b6 pt-10">
        <TitleHeader title="마이 페이지" />
        <img src={profile} alt="profile" className="w-[130px] h-[130px] rounded-full  " />
        <div className="T01_B text-white mt-4">써봄 님</div>
        <div className="B02_M text-white mt-2 mb-5">써봄 님의 프로필 이미지입니다.</div>
      </div>

      <div className="pt-3 ">
        <ProfileContents title="내 정보 관리" righticon="right" onClick={() => {}} />

        <div className="B02_B text-gray-900 mx-8 mt-10">내 활동 관리</div>
        <div className="flex flex-col gap-2 mt-4">
          <ProfileContents title="내 정보 관리" icon="icon" righticon="right" onClick={() => {}} />
          <ProfileContents title="내 정보 관리" icon="icon" righticon="right" onClick={() => {}} />
        </div>
      </div>
    </>
  );
};

export default Profile;
