import { rootReducer } from "../reducers";
import { createReduxStore } from "app/providers/StoreProvider/config/store";

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore["dispatch"];
