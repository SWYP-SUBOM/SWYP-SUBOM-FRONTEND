import { useNavigate } from 'react-router-dom';
import post from '../../assets/Profile/post.svg';
import profile from '../../assets/Profile/Profile.png';
import reaction from '../../assets/Profile/reaction.svg';
import { TitleHeader } from '../../components/common/TitleHeader';
import { useGetHome } from '../../hooks/Home/useGetHome';
import { useGetUserName } from '../../hooks/User/useGetUserName';
import { ProfileContents } from './_components/Profilecontents';

export const Profile = () => {
  const navigate = useNavigate();
  const { data: userName, isLoading: isUserNameLoading } = useGetUserName();
  const { data: homeData, isLoading: isHomeDataLoading } = useGetHome();

  const streak = homeData?.streak?.current ?? 0;
  const isLoading = isUserNameLoading || isHomeDataLoading;

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex flex-col items-center justify-center bg-b6">
        <TitleHeader title="마이 페이지" />
        <img src={profile} alt="profile" className="w-[130px] h-[130px] rounded-full  " />
        <div className="T01_B text-white mt-4">
          {isLoading ? '...' : userName ? `${userName} 님` : '님'}
        </div>
        <div className="B02_M text-white mt-2 mb-5">
          {isLoading
            ? '...'
            : streak > 0
              ? `${streak}일 째 써봄과 함께 하는 중`
              : '써봄과 함께 하는 중'}
        </div>
      </div>

      <div className="pt-3" style={{ paddingBottom: 'calc(100px + env(safe-area-inset-bottom))' }}>
        <ProfileContents
          title="내 정보 관리"
          righticon={true}
          onClick={() => navigate('/profile/myinfo')}
        />

        <div className="B02_B text-gray-900 mx-8 mt-10">내 활동 관리</div>
        <div className="flex flex-col gap-2 mt-4">
          <ProfileContents
            icon={reaction}
            title="내가 반응 남긴 글"
            righticon={true}
            onClick={() => navigate('/profile/my-reactions')}
          />
          <ProfileContents
            icon={post}
            title="내가 쓴 글"
            righticon={true}
            onClick={() => navigate('/profile/my-posts')}
          />
        </div>
      </div>
    </div>
  );
};
