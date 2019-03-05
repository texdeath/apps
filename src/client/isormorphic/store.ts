import { History } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { rootReducer, RootState } from '../modules';

/**
 * ミドルウェアの注入を行ったストアを返却する
 *
 * @param {object}  initialState
 * @param {History} history
 * @return object
 */
export const configureStore = (
    initialState: Partial<RootState>,
    history: History) => {
        // historyを注入
        const middleWare = applyMiddleware(routerMiddleware(history));
        const store = createStore(
            connectRouter(history)(rootReducer),
            initialState,
            middleWare,
        );
        return {
            history,
            store,
        };
    };