// useLocation.js
import { useSelector } from 'react-redux';
import { useAppSelector } from './useTypedSelector';

const useLocation = () => {
  const { location } = useAppSelector((state) => state.event);

  return { location };
};

export default useLocation;