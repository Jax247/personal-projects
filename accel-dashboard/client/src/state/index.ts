import {
  createSlice,
  CreateSliceOptions,
  configureStore,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Api } from "./api";


interface ModeState {
    mode: string;
    user: string;
}

const initialState: ModeState = {
  mode: "dark",
  user: "63701cc1f03239f09e00018a"
};

const sliceOptions = {
  name: "global",
  initialState,
  reducers: {
    setMode: (state: ModeState) => {
       state.mode = state.mode === "light" ? "dark" : "light"
    },
  },
} as CreateSliceOptions;

export const globalSlice = createSlice(sliceOptions);

export const setMode  = globalSlice.actions;



const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    [Api.reducerPath] : Api.reducer,
},
middleware: (getDefault) => getDefault().concat(Api.middleware)
});

setupListeners(store.dispatch)



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
