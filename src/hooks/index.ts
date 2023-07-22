import type { AppDispatch, RootState } from '@/redux/store'
import {
  useSelector,
  type TypedUseSelectorHook,
  useDispatch,
} from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch
