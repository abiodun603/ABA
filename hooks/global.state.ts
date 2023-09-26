
import { RootState } from '../stores/store';
import { useAppSelector } from './useTypedSelector';


const useGlobalState = () => {
  const profile = useAppSelector((state: RootState) => state.auth.profile);
  const user = useAppSelector((state: RootState) => state.auth.user);

  return { profile, user };
};

export default useGlobalState;
