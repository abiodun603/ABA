// useLocation.js
import { useSelector } from 'react-redux';
import { useAppSelector } from './useTypedSelector';

const useLocation = () => {
  const { location, cords} = useAppSelector((state) => state.event);

  return { location,  cords};
};

export default useLocation;