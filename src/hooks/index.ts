import type { AppDispatch, RootState } from '@/redux/store'
import {
  useSelector,
  type TypedUseSelectorHook,
  useDispatch,
} from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppLocalStorage = <T extends string, A>(key: T, def: A) => {
  const getLocalStorage: () => A = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const local = localStorage.getItem(key)
      return local ? JSON.parse(local) : def
    }
    return def
  }
  const setLocalStorage = (val: A): void =>
    localStorage.setItem(key, JSON.stringify(val))

  return [getLocalStorage(), setLocalStorage] as [A, typeof setLocalStorage]
}
