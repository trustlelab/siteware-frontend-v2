import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Use throughout your app instead of plain `useDispatch`
/**
 *
 */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

// Use throughout your app instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;