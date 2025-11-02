import { useLocation } from 'react-router-dom';

export const Write = () => {
  const location = useLocation();

  const categoryName = location.state.categoryName;
  const topicName = location.state.topicName;
  return (
    <>
      <div>{categoryName}</div>
      <div>{topicName}</div>
    </>
  );
};
