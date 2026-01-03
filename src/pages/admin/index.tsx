import { Header } from '../../components/admin/common/Header';

const month = new Date().getMonth() + 1;
const day = new Date().getDate();
const week = ['일', '월', '화', '수', '목', '금', '토'][new Date().getDay()];

export const Admin = () => {
  return (
    <div>
      <Header title="써봄 워크스페이스" button="질문 삭제" />
      <div className="w-full flex flex-col pl-4 pt-10 ">
        <div className="B01_M text-gray-900">
          {month}월 {day}일 ({week})
        </div>
      </div>
    </div>
  );
};
