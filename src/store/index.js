import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import selectedDevicesReducer from '../reducers/selectedDevicesReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    selectedDevices: selectedDevicesReducer,
  },
});

store.subscribe(() => console.log(store.getState()));