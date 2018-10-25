import {createStore, combineReducers} from 'redux';
import ItemsReducer from './reducers/Items';
import UserReducer from './reducers/Users';
import FilterReducer from './reducers/Filter';
import LoadingReducer from './reducers/Loading';
import { REDUX_TOKEN } from '../ApiMethods/Account';

export default () => {

    const persistedState = localStorage.getItem(REDUX_TOKEN) ? JSON.parse(localStorage.getItem(REDUX_TOKEN)) : {}
    
    const store = createStore(combineReducers({
        items: ItemsReducer,
        user: UserReducer,
        filter: FilterReducer,
        loading: LoadingReducer
        }),persistedState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.subscribe(()=>{
        localStorage.setItem('reduxState', JSON.stringify(store.getState()))
    })
    
    return store;
};