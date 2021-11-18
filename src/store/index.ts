import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { useSelector as originalUseSelector } from 'react-redux'
import thunk from 'redux-thunk'
import productReturn from './modules/index'

const rootReducer = combineReducers({
    productReturn
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

let store: any
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose

    store = createStore(rootReducer, applyMiddleware(thunk))

export const enhancementAction = (action: Function) => action(store.dispatch, store.getState)

export const useSelector = <T>(state: any): T => originalUseSelector(state)

export default store
