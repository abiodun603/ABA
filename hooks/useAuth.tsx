import { useMemo } from 'react'
import { useAppSelector } from './useTypedSelector'
import { selectCurrentUser } from '../stores/features/auth/authSlice'

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}
