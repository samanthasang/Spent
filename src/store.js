import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReduser from "./redux/root-reducer";

const middleware = [thunk];

export const store = createStore(
  rootReduser,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

// export default { store, persistor };
