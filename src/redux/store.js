import { legacy_createStore } from "redux";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = legacy_createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__?.())
const persistor = persistStore(store)

export { store, persistor }