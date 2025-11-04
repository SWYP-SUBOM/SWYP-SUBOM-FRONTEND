import pen from '../../../assets/Calendar/pen.svg';

export const MonthlyTrainingStatusBox = () => {
  return (
    <div className="flex justify-center items-center mt-3.5 bg-b7">
      <div className="flex">
        <img src={pen} alt="pen" className="w-10 h-10" />
        <div className="flex flex-col">
          <span className="B02_B">10회</span>
          <span className="B02_B">글쓰기</span>
        </div>
      </div>
    </div>
  );
};
