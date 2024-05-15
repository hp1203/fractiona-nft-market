import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appConfig from "./appConfig";
import authconfig from "./authConfig";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({
    appconfig: appConfig,
    authconfig: authconfig
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['authconfig', 'appconfig']
};

export const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});