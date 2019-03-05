import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';

export type RootState = {
    router: RouterState,
};

/**
 * Reducerの定義
 * @return {Object} rootReducer
 */
export const rootReducer = combineReducers<RootState>({} as any);

/**
 * 初期stateの定義
 * @return {Object} initialState
 */
export const initialState = (): Partial<RootState> => {
    return {};
};